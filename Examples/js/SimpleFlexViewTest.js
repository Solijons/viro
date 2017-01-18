/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroOrbitCamera,
  ViroCamera,
  ViroImage,
  ViroVideo,
  Viro360Image,
  Viro360Video,
  ViroFlexView,
  ViroUtils,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroSurface,
  ViroSkyBox,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var FlexViewTest = React.createClass({
  render: function() {
    console.log("kirby", "in here!");
    return (
      <ViroScene reticleEnabled={true} >

        <ViroSkyBox color="#ff69b4" />

        <ViroImage style={{flex:1}} source={{uri: "http://wiki.magicc.org/images/c/ce/MAGICC_logo_small.jpg"}}
          onLoadStart={this._onLoadStart("Image")} onLoadEnd={this._onLoadEnd("Image")} position={[0,0,-3]} scale={[4,4,0]}/>

        <ViroFlexView style={styles.containerVertical} position={polarToCartesian([2, 0, 0])} width={3} height={2} opacity={1}>
          <ViroFlexView style={styles.containerInner} >
            <ViroSurface style={{flex:1}} materials={["redColor"]} />
            <ViroImage style={{flex:1}} source ={require("./res/sun_2302.jpg")}
              onLoadStart={this._onLoadStart("Image")} onLoadEnd={this._onLoadEnd("Image")} />
          </ViroFlexView>
          <ViroFlexView style={styles.containerInner} >
            <ViroImage style={{flex:1}} source={{uri: "http://wiki.magicc.org/images/c/ce/MAGICC_logo_small.jpg"}}
              onLoadStart={this._onLoadStart("Image")} onLoadEnd={this._onLoadEnd("Image")} />
          </ViroFlexView>
        </ViroFlexView>

      </ViroScene>
    );
  },
  /*
  <Viro360Image source={{uri: "http://cdn3-www.dogtime.com/assets/uploads/gallery/pembroke-welsh-corgi-dog-breed-pictures/prance-8.jpg"}} rotation={[-30,90,0]} />
  */
  _onLoadStart(component) {
    return () => {
      console.log("flexViewTest " + component + " load start");
    }
  },
  _onLoadEnd(component) {
    return () => {
      console.log("flexViewTest " + component + " load end");
    }
  },
  _onFinish(component) {
    return () => {
      console.log("flexViewTest " + component + " finished");
    }
  },
  _onAnimationFinished(){
    console.log("AnimationTest on Animation Finished!");
  },
});

const styles = StyleSheet.create({
  containerVertical: {
    flexDirection: 'column',
  },
  containerInner: {
    flexDirection: 'row',
    flex: 1,
    padding: .1,
    backgroundColor: "#0000ff",
  },
  containerHorizontal: {
    flexDirection: 'row',
    padding: .1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

ViroMaterials.createMaterials({
  sunTexture: {
    diffuseTexture: require("./res/sun_2302.jpg"),
  },
  redColor: {
    diffuseColor: "#ff0000"
  },
  cardpetite: {
    shininess : 1.0,
    lightingModel: "Constant",
    diffuseTexture: require('./res/card_petite_ansu.png'),
  },
});

ViroAnimations.registerAnimations({
    moveRight:{properties:{positionX:"+3"}, duration: 3000},
    moveLeft:{properties:{positionX:"+-3"}, duration: 3000},
    rotate:{properties:{rotateZ:"+90"}, duration:3000},
    rotateY:{properties:{rotateY:"+180"}, duration:1500},
    rotateAndMovePicture:[
        ["moveLeft", "moveRight"],
        ["moveRight", "moveLeft"],
        ["rotateY", "rotateY"],
        ["rotate"],

    ],
});

module.exports = FlexViewTest;