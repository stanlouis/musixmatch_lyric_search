import React, { Component } from "react";

import { Consumer } from "../../context";
import Spinner from "../../components/layout/Spinner";
import SingleTrack from "./SingleTrack";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list, heading } = value;
          return track_list === undefined || track_list.length === 0 ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <h3 className="text-center">{heading}</h3>
              <div className="row">
                {track_list.map(item => (
                  <SingleTrack key={item.track.track_id} track={item.track} />
                ))}
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
