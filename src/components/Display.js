import { Share } from 'react-twitter-widgets'
import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';

class Display extends Component {

  state = { videos: [] };

  getVideos() {
    axios.get('https://res.cloudinary.com/tomanistor/video/list/miniflix.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources});
    });
  }

  componentDidMount() {
    this.getVideos();
  }

  render() {

    const { videos }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Latest Videos on Miniflix</h3>
        <hr/>

        <div className="col-sm-12">
          <CloudinaryContext cloudName="tomanistor">
            { videos.map((data, index) => (
                <div className="col-sm-6" key={index}>
                  <div className="embed-responsive embed-responsive-4by3">
                    <Video publicId={data.public_id} width="600" height="600" controls></Video>
                  </div>
                  <Share url={`https://res.cloudinary.com/unicodeveloper/video/upload/${data.public_id}.mp4`} />
                </div>
              ))
            }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default Display;
