/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ViroScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroText,
  ViroSurface,
  ViroOmniLight,
} from 'react-viro';

var ReleaseMenu = require("./ReleaseMenu.js");
var PhysicsRayTest = React.createClass({
  getInitialState() {
    return {
      bodyType:"dynamic",
      applyConstantVelocity:undefined,
      applyConstantForce:undefined,
      applyConstantTorque:undefined,

      mass:1,
      position:[0,0,-6]
    };
  },


  togglePhysicsBody(tag){
    return () => {
        console.log("Click numeric tag: " + tag);
        if (tag == 0){

          this.setState({
            position:[0,0,-9999]
          });

          let that = this;
          setTimeout(function(){
            that.setState({
              bodyType:"kinematic",
              applyConstantVelocity:undefined,
              applyConstantForce:undefined,
              applyConstantTorque:undefined,
              mass:0,
              position:[0,0,-6]
            });

          }, 200);

        } else if (tag == 1){
          var finalConst = this.state.applyConstantForce == undefined ? [10,0,0] : undefined;
          this.setState({
            applyConstantForce: finalConst
          });
        } else if (tag ==2){
          this.refs["box"].applyImpulse([30,0,0], [0,0,0]);
        } else if (tag ==3){
          var finalConst = this.state.applyConstantTorque == undefined ? [0,0,-5] : undefined;
          this.setState({
            applyConstantTorque: finalConst
          });
        } else if (tag ==4){
          this.refs["box"].applyTorqueImpulse([0,0,-10]);
        } else if (tag ==5){
          this.refs["box"].applyImpulse([0,0,-10], [0,3,0]);
        } else if (tag ==6){
          this.refs["box"].applyTorqueImpulse([0,3,0], [2,0,0]);
        } else if (tag == 7){
          var finalType = "dynamic";
          var finalMass = 1;
          if (this.state.bodyType === "dynamic"){
            finalType ="static";
            finalMass = 0;
          } else if (this.state.bodyType === "static"){
            finalType = "kinematic";
            finalMass = 0;
          }
          this.setState({
            bodyType: finalType,
            mass: finalMass
          });
        } else if (tag ==8){
          var finalConst = this.state.applyConstantVelocity == undefined ? [2,0,0] : undefined;
          this.setState({
            applyConstantVelocity: finalConst
          });
        } else if (tag == 9){
          this.refs["box"].setInstantaneousVelocity([1,0,0]);
        }
    }
  },

  render: function() {
    return (
              <ViroScene ref={"scene1"}>
                <ReleaseMenu sceneNavigator={this.props.sceneNavigator}/>

                 <ViroNode position={[2 , -1, -7]} transformBehaviors={["billboard"]}>
                  <ViroText fontSize={35}  style={styles.centeredText}
                    position={[0,2, 0]} width={4} height ={2} maxLines={3}
                    color={this.state.applyConstantForce === undefined ? '#ffffff' : '#0000ff'}
                    text={"Apply Constant Force"} onClick={this.togglePhysicsBody(1)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[0,1, 0]} width={4} height ={2} maxLines={3}
                      text={"Apply ImpulseForce"} onClick={this.togglePhysicsBody(2)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[0,0, 0]} width={4} height ={2} maxLines={3}
                      color={this.state.applyConstantTorque === undefined ? '#ffffff' : '#0000ff'}
                      text={"Apply Constant Torque"} onClick={this.togglePhysicsBody(3)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[0,-1, 0]} width={4} height ={2} maxLines={3}
                      text={"Apply Impulse Torque"} onClick={this.togglePhysicsBody(4)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                          position={[0,-2, 0]} width={4} height ={2} maxLines={3}
                          text={"Reset"} onClick={this.togglePhysicsBody(0)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[4,2, 0]} width={4} height ={2} maxLines={3}
                      text={"Apply Impulse Force At Point"} onClick={this.togglePhysicsBody(5)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[4,1, 0]} width={4} height ={2} maxLines={3}
                      text={"Apply Impulse Torque At Point"} onClick={this.togglePhysicsBody(6)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                      position={[4,0, 0]} width={4} height ={2} maxLines={3}
                      text={"Toggle BodyType: " + this.state.bodyType} onClick={this.togglePhysicsBody(7)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                            position={[4,-1, 0]} width={4} height ={2} maxLines={3}
                            color={this.state.applyConstantVelocity === undefined ? '#ffffff' : '#0000ff'}
                            text={"Apply Const Velocity"} onClick={this.togglePhysicsBody(8)}/>

                  <ViroText fontSize={35}  style={styles.centeredText}
                            position={[4,-2, 0]} width={4} height ={2} maxLines={3}
                            text={"Apply Instantaneous Velocity"} onClick={this.togglePhysicsBody(9)}/>
                </ViroNode>

                <ViroNode position={[0 , -9, -8.5]}>

                  <ViroBox
                      ref="box"
                      position={this.state.position}
                      scale={[2, 6, 2]}
                      materials={["redColor","blue","redColor","blue","redColor","blue"]}
                      height={1} width={1} length={1}
                      physicsBody={{
                        type:this.state.bodyType,
                        mass:this.state.mass,
                        useGravity:false,
                        force:{
                          power:this.state.applyConstantForce === undefined ? [0,0,0] : this.state.applyConstantForce
                        },
                        torque:this.state.applyConstantTorque,
                        velocity:this.state.applyConstantVelocity
                      }}
                      />


                </ViroNode>

                <ViroOmniLight
                      position={[0, 0, 0]}
                      color={"#ffffff"}
                      attenuationStartDistance={30}
                      attenuationEndDistance={40}/>
            </ViroScene>

    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  baseTextTwo: {
    fontFamily: 'Arial',
    color: '#ffffff',
    flex: 1,
  },
  centeredText: {
       fontFamily: 'Arial',
       color: '#ffffff',
       flex: 1,
  },

});

ViroMaterials.createMaterials({
  redColor: {
    shininess: 2.0,
    diffuseColor: "#ff0000"
  },
  box2: {
    lightingModel: "Phong",
    shininess : 2.0,
    diffuseColor: "#3FBF3F",
  },
  blue: {
      cullMode: "None",
      shininess: 2.0,
      diffuseColor: "#8640ff22"

    },
 });

module.exports = PhysicsRayTest;