var React = require('react');
var GoogleMap = require('google-map-react'),
    MapMarker = require('../components/MapMarker.jsx'),
    connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    TextField = mui.TextField,
    Dialog = mui.Dialog,
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.FlatButton;

var actions = require('../actions');

var muiAutocomplete = mui.AutoComplete;
 var AutoComplete = React.createClass({

     getInitialState: function() {
         return { 
             data: []
         };
     },


  handleUpdateInput: function(t) {
    this.setState({
      dataSource: [t, t + t, t + t + t],
    });
  },

  render: function() {
    return (
      <AutoComplete
        hintText="Type c"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
    );
  }
});


var mapStateToProps = function(state) {
    return {
        conferences: state.conferences,
        selectedConferenceId: state.selectedConferenceId,
        isLoggedIn: !!state.profile,
        profile: state.profile
    }; 
};

var mapDispatchToProps = function(dispatch) {
  return {
      saveConference: function(conferenceId, conference) { 
          dispatch(actions.saveConference(conferenceId, conference));
      },
      selectConference: function(conferenceId) {
          dispatch(actions.selectConference(conferenceId));
      },
      fetchConferences: function() {
          dispatch(actions.fetchConferences());
      },
      beginLogin: function() {
          dispatch(actions.beginLogin());
      }
  };  
};

var Home = React.createClass({

    saveConference: function() {
        
      var conference = {
          name: this.refs.name.getValue(),
          url: this.refs.homepage.getValue(),
          address: this.refs.address.getValue()
      };
        
        
      this.props.saveConference(null, conference);
      this.hideConferenceDialog();  
    },
    
    hideConferenceDialog: function() {
        this.setState({
            showConferenceDialog: false
        })  
    },
    
    showConferenceDialog: function() {
        this.setState({
            showConferenceDialog: true
        })  
    },
    
    getInitialState: function() {
        return {
            showConferenceDialog: false
        };
    },
    
    render: function() {

        var markers = this.props.conferences ? this.props.conferences.map(function(conference) {
            return <MapMarker key={conference.id} 
                lat={conference.location.lat} 
                lng={conference.location.lng} />;
        }) : [];
        
        var selectedConference = null;
        if ( this.props.selectedConferenceId ) {
            selectedConference = _.find(this.props.conferences, {id: this.props.selectedConferenceId});
        }
        
        var center =  {lat:51.4826, lng: 0.0077};
        var zoom =  9;
        var actions = [<FlatButton secondary={true} label="Forget" onClick={this.hideConferenceDialog} />,
        <FlatButton primary={true} 
            label="Create"
            onClick={this.saveConference} />];

            var enable_conference_submission =
                process.env.enable_conference_submission ||
                window.env.enable_conference_submission;
            
        return  <div>
                    <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                        <h1>Confinder</h1>
                        <h3>Find out what's going on near you.</h3>
                    </center>
                    {!this.props.isLoggedIn ?
                    <RaisedButton onClick={this.props.beginLogin}>
                        Login
                    </RaisedButton> :
                    <div>
                        <div>
                            Hi {this.props.profile.nickname}!
                        </div>
                        {enable_conference_submission ?
                        <RaisedButton onClick={this.showConferenceDialog}>
                            List my conference
                        </RaisedButton>: null}
                    </div> }
                    <div style={{width: '100%', height: '20em', overflow: 'hidden'}} > 
                        <GoogleMap
                            onChildClick={this.props.selectConference}
                            defaultCenter={center}
                            defaultZoom={zoom}>
                            {markers}
                        </GoogleMap>
                    </div>
                    {enable_conference_submission ?
                    <Dialog
                        modal={true}
                        open={this.state.showConferenceDialog}
                        title="Add a new conference" 
                        actions={actions}>
                        
                        
                        <TextField ref="name" floatingLabelText="Name" />
                        <br />
                        <TextField ref="homepage" floatingLabelText="Home page" />
                        <br />
                        <TextField ref="address" floatingLabelText="Address" />
                        <br />
                    </Dialog> : null}
                    
                    {this.props.selectedConferenceId ? 
                    <div>
                        <a href={selectedConference.url} target="_blank">
                            <h2>
                                {selectedConference.name}
                            </h2>
                        </a>
                    </div> : null}
                </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);