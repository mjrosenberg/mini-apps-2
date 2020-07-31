import React from 'react';
import ReactDom from 'react-dom';
import Frame from './components/Frame.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      totScore: 0,
      frameNum: 1,
      // currFrame: 1,
      frames: [1,2,3,4,5,6,7,8,9,10],
      frameScore: 0,
      currThrow: 1,
      strike: false,
      spare: false,
      double: false,
    };
    this.addToScore = this.addToScore.bind(this);
    this.submitScore = this.submitScore.bind(this);
  }

  addToScore(num){
    this.setState({
      totScore: this.state.totScore + num,
    })
  }

submitScore(e) {
    // e.preventDefault();
    console.log(this.state);
    let throwScore = document.getElementById('throw').value;
    document.getElementById('throw').value = 0;
    console.log('throw score is', throwScore);

    if (this.state.frameNum < 10){
      if (this.state.currThrow === 1){
        if (throwScore < 10) {
          document.getElementById(`firstThrow${this.state.frameNum}`).innerHTML = throwScore;
          if (this.state.spare === false){
            if (this.state.double){
              this.setState({
                totScore: this.state.totScore + 10 + parseInt(throwScore),
                currThrow: 2,
                frameScore: throwScore,
                double: false,
              }, () => {
                console.log('updated');
                document.getElementById(`totScore${this.state.frameNum - 2}`).innerHTML = this.state.totScore;
                // document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
              });
            } else {
              this.setState({
                currThrow: 2,
                frameScore: throwScore,
                double: false,
                // strike: false,
              });
            }
          } else {
            //the turn before was a spare
            this.setState({
              currThrow: 2,
              frameScore: throwScore,
              totScore: parseInt(this.state.totScore) + parseInt(throwScore),
              double: false,
              // strike: false,
              //update the total score to add 10 after the second frame and then just add the extra on this frame and append it to the last frame's score
            }, () => {
              document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
            });
          }
        } else {
          //strike on the first throw
          document.getElementById(`firstThrow${this.state.frameNum}`).innerHTML = 'X';
          if (this.state.strike){
            this.setState({
              currThrow: 1,
              frameNum: this.state.frameNum + 1,
              totScore: parseInt(this.state.totScore) + 10,
              strike: true,
              double: true
            });

          } else if (this.state.spare){
            this.setState({
              currThrow: 1,
              frameNum: this.state.frameNum + 1,
              totScore: parseInt(this.state.totScore) + 10,
              strike: true,
              double: false,
              spare: false
            } () => {
              document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
            });
          } else {
            this.setState({
              currThrow: 1,
              frameNum: this.state.frameNum + 1,
              totScore: parseInt(this.state.totScore) + 10,
              strike: true,
              double: false
            });
          }
        }
      } else {
        if (!this.state.strike){
          console.log('no strike before');
          if (throwScore < 10 - this.state.frameScore){
            //did not throw a spare
            document.getElementById(`secondThrow${this.state.frameNum}`).innerHTML = throwScore;
            let totFrameScore = parseInt(throwScore) + parseInt(this.state.frameScore);
            this.setState({
              currThrow: 1,
              frameScore: 0,
              frameNum: this.state.frameNum + 1,
              totScore: this.state.totScore + totFrameScore,
              spare: false,
            }, () => {
              document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
            });
          } else{
            document.getElementById(`secondThrow${this.state.frameNum}`).innerHTML = '\\';
            this.setState({
              currThrow: 1,
              frameScore: 0,
              totScore: this.state.totScore + 10,
              spare: true,
              frameNum: this.state.frameNum + 1,
            });
          }
        } else {
          //if a strike was thrown on the previous turn
          console.log('strike before');

          if (throwScore < 10 - this.state.frameScore){
            //did not throw a spare
            document.getElementById(`secondThrow${this.state.frameNum}`).innerHTML = throwScore;
            let prevFrameScore = parseInt(this.state.frameScore) + parseInt(throwScore);
            this.setState({
              currThrow: 1,
              frameScore: 0,
              frameNum: this.state.frameNum + 1,
              totScore: parseInt(this.state.totScore) + parseInt(prevFrameScore) + parseInt(prevFrameScore),
              strike: false,
              spare: false,
              //update the total score to add 10 after the second frame and then just add the extra on this frame and append it to the last frame's score
            }, () => {
              console.log('updated');
              document.getElementById(`totScore${this.state.frameNum - 2}`).innerHTML = this.state.totScore - prevFrameScore;
              document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
            });
          } else{
            document.getElementById(`secondThrow${this.state.frameNum}`).innerHTML = '\\';
            let prevFrameScore = parseInt(this.state.frameScore) + parseInt(throwScore);
            this.setState({
              currThrow: 1,
              frameScore: 0,
              frameNum: this.state.frameNum + 1,
              totScore: parseInt(this.state.totScore) + parseInt(prevFrameScore) + parseInt(prevFrameScore),
              strike: false,
              spare: true,
              //update the total score to add 10 after the second frame and then just add the extra on this frame and append it to the last frame's score
            }, () => {
              console.log('updated');
              document.getElementById(`totScore${this.state.frameNum - 2}`).innerHTML = this.state.totScore - prevFrameScore;
              // document.getElementById(`totScore${this.state.frameNum - 1}`).innerHTML = this.state.totScore;
            });
          }
        }
      }
    } else {
      //implement logic for having a third throw if a spare or strike on the tenth
    }
  }

  render(){
    return(
      <div id='mainWrapper'>
        <label for='throw'>Input Score for Frame {this.state.frameNum} Throw {this.state.currThrow}</label>
        <input type='number' id='throw' name='throw' min="0" max={10-this.state.frameScore}></input><br></br>
        <button id='submitScore' onClick={this.submitScore} >Submit Throw</button><br></br>
        {
        this.state.frames.map((frame) => {
          // console.log('frame is', frame);
          return (<Frame currScore={this.state.currScore} frameNum={frame}/>);
        })
        }
      </div>
    );
  }
}

ReactDom.render(<App/>, document.getElementById('app'));