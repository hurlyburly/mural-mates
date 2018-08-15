import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import Home from "../../pages/Home";
import ImageSlicer from "../ImageSlicer";
import { List, ListItem } from "../List";
import API from "../../utils/API";

const styles = {
  test: {
    width: '300px',
    height: '100px',
    backgroundRepeat: "no-repeat",
    backgroundPosition: '0 75%',
  }
}

class JoinMural extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMurals: []
    };
  }

  componentDidMount() {
    this.loadOpenWorldGames();
  }
  loadOpenWorldGames = props => {
    // this.loadOpenGames();
    API.findOpenMurals()
      .then(res => {
        this.setState({
          openMurals: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {

    return (
      <div>
        <h3>Join a Mural!</h3>
        <List>
          {this.state.openMurals.map(game => (
            <ListItem key={game._id}>
              <Link to={"/game/" + game._id}>
                <strong>
                  Image Hint:<ImageSlicer image={game.pImg1} />
                  {/* Img: <img src={game.pImg1} /> */}
                  <br />
                  Mural Title : {game.title}
                  <br />
                  Created By: {game.playerName1}
                  <Image
                    src={game.playerPhoto1}
                    alt={game.playerName1}
                    avatar
                  />
                </strong>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
export default JoinMural;
