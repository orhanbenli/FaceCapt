import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "692861124a9e4d56a59654f3c8a706c7",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: "",
      route: "signin",
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRouteChange = () => {
    this.setState({ route: "home" });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={150} type="cobweb" bg={true} />
        <Navigation />
        {this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
