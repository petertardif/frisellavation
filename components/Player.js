import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";
import AwesomeButton from 'react-native-really-awesome-button';
import { MaterialIcons } from "@expo/vector-icons";

// class PlaylistItem {
//   constructor(name, uri, isVideo) {
//     this.name = name;
//     this.uri = uri;
//     this.isVideo = isVideo;
//   }
// }

getRandomQuote = () => {
  const randomNumForQuote = Math.floor(Math.random() * 14);
  const randomQuote = `https://res.cloudinary.com/tooltimeshare/video/upload/FrisellaVation/${randomNumForQuote}.mp3`;
  
  // const quote = new PlaylistItem(
  //   randomNumForQuote,
  //   randomQuote,
  //   false
  // );

  return randomQuote
}

const PLAYLIST = [
  getRandomQuote()
  // new PlaylistItem(
  //   "Big Buck Bunny",
  //   getRandomQuote(),
  //   false
  // ),
  // new PlaylistItem(
  //   "Mildred Bailey – “All Of Me”",
  //   getRandomQuote(),
  //   false
  // ),
  // new PlaylistItem(
  //   "Popeye - I don't scare",
  //   getRandomQuote(),
  //   false
  // ),
  // new PlaylistItem(
  //   "Podington Bear - “Rubber Robot”",
  //   getRandomQuote(),
  //   false
  // )
];

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const VIDEO_CONTAINER_HEIGHT = 0;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      // loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    // (async () => {
    //   await Font.loadAsync({
    //     ...MaterialIcons.font,
    //     "cutive-mono-regular": require("../assets/fonts/SpaceMono-Regular.ttf")
    //   });
    //   this.setState({ fontLoaded: true });
    // })();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    // const source = { uri: PLAYLIST[this.index].uri };
    const source = { uri: getRandomQuote() };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
    };

    // if (PLAYLIST[this.index].isVideo) {
    //   console.log(this._onPlaybackStatusUpdate);
    //   await this._video.loadAsync(source, initialStatus);
    //   this.playbackInstance = this._video;
    //   const status = await this._video.getStatusAsync();
    // } else {
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;
    // }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        showVideo: PLAYLIST[this.index].isVideo,
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        // loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish) {
        this._advanceIndex(true);
        // changed status to false within function below. This stopped the looping of the motivate button
        this._updatePlaybackInstanceForIndex(false);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}><View />
      <AwesomeButton 
        stretch
        backgroundColor='red' 
        onPress={this._onPlayPausePressed}
      >
        <Text>
        {this.state.isPlaying
                ? 'Pause Motivation'
                : 'Motivate Me'}
        </Text>
      </AwesomeButton>
        <View style={styles.space} />
        <View style={styles.videoContainer}>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
                width: this.state.videoWidth,
                height: this.state.videoHeight
              }
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            // onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch"
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20
  },
});
