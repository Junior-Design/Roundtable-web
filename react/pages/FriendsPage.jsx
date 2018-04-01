import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import SongList from '../components/SongItem';
import { FriendItem } from '../components/FriendItem';

import comms from '../comms';

const rightStyle = {
  textAlign: 'right'
}
const linkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class FriendsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {"friends" : []}
        let comp = this

          comms.getFriends(function(friends) {
            comp.setState({"friends": friends})
          })
    }

    //not being used right now
    friendClicked(id) {
        window.location = '/user?id=' + id
    }
    
    render() {
        let friends =this.state.friends.map(function(friend) {
            return (<FriendItem friend={friend}/>)
        })

    return (
        <div className="FriendItem">
             { friends }
        </div>);
    }
}