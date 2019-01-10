import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import musixmatch from "../../api/musixmatch";
import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    album: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    musixmatch
      .get("/track.lyrics.get", {
        params: {
          track_id: id
        }
      })
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return musixmatch.get("/track.get", {
          params: {
            track_id: id
          }
        });
      })
      .then(res => {
        const { album_id } = res.data.message.body.track;
        this.setState({ track: res.data.message.body.track });

        return musixmatch.get("/album.get", {
          params: {
            album_id: album_id
          }
        });
      })
      .then(res => {
        this.setState({
          album: res.data.message.body.album
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics, album } = this.state;
    return track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0 ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album Name</strong>: {track.album_name}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Album Rating</strong>: {album.album_rating}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">{album.album_release_date}</Moment>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Lyrics;
