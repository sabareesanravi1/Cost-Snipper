import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
const theme = {
  background: '#f5f8fb',
  headerBgColor: '#0088cc',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0088cc',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


class DBPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;
    

    const queryUrl = `http://127.0.0.1:8081/graphdata?url=${search}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        if (this.responseText!=="failed") {
        const response = JSON.parse(this.responseText);
        console.log(response);

          console.log(response);
          var arr =  response.graphData[1].data;
          var popObject = Object.keys(arr).sort();
          var date=popObject.pop();
          var min=arr[date];
          for(var i=0;i<2;i++)
          {
            var tempDate = popObject.pop();
            if(min>arr[tempDate])
            {
               date=tempDate;
              min=arr[tempDate];            
            }
          }
          var dateVal= new Date(date).toDateString();
          var actualarr =  response.graphData[0].data;
          var actualpopObject = Object.keys(actualarr).sort();
          var todayprice=actualarr[actualpopObject.pop()];
          if(todayprice<min)
          {
            self.setState({ loading: false, result: 'You Can buy today there is a chance of increase in price' });
          }
          else
          {
            self.setState({ loading: false, result: 'You can buy on '+dateVal+' at the price of Rs.'+min });
          }
        } 
        else 
        {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        { loading ? <Loading /> : result }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <Button
                style={{backgroundColor:'#0088cc',color:'white'}}
                onClick={() => this.triggetNext()}
              >
                Search <RotateLeftIcon/>
              </Button>
            }
          </div>
        }
      </div>
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const ExampleDBPedia = () => (
  <ThemeProvider theme={theme}>
  <ChatBot
   speechSynthesis={{ enable: true, lang: 'en' }}
    steps={[
      {
        id: '1',
        message: 'Welcome! What is your name?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: '4'
      },
      {
        id: '4',
        message: 'Please type the url you are going to Purchase',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '5',
      },
      {
        id: '5',
        component: <DBPedia />,
        waitAction: true,
        trigger: '4',
      },
    ]}
  />
  </ThemeProvider>
);

export default ExampleDBPedia;