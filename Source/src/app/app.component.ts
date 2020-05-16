import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PusherService } from './pusher.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pusher: PusherService, private http: HttpClient) {
  }

  event = 'vote';
  vote = '';
  voted = false;
  votesData;
  displayChart = false;
  duplicate = false;
  playerIds = [28081,253802,219889,234675,625383];
  //playerapiData = [];https://api.trumail.io/v2/lookups/json?email=vemula1802@gmail.com

  playerData = [
    {
      name: 'M S Dhoni',
      pid: 28081,
      Runs: 0,
      Wickets: 0,
      Catches: 0,
      shortName: 'Dhoni',
      image:
          'https://smedia2.intoday.in/aajtak/images/Photo_gallery/092019/w43243_030420010835_030920012325.jpg',
      battingAvg: 0,
      bowlingAvg: 0,
      matches: 0,
      link: `https://www.cricapi.com/player/28081`
    },
    {
      name: 'Virat Kohli',
      Runs: 0 ,
      pid: 253802,
      Wickets: 0,
      Catches: 0,
      shortName: 'Kohli',
      image:
          'https://imagevars.gulfnews.com/2019/04/29/Virat-Kohli-gestures_16a6847fc38_large.jpg',
      battingAvg: 0,
      bowlingAvg: 0,
      matches: 0,
      link: `https://www.cricapi.com/player/253802`
    },
    {
      name: 'David Warner',
      Runs: 0,
      pid: 219889,
      Wickets: 0,
      Catches: 0,
      shortName: 'Warner',
      image:
          'https://engcric.b-cdn.net/wp-content/uploads/2019/04/GAZI_1576.jpg',
      battingAvg: 0,
      bowlingAvg: 0,
      matches: 0,
      link: `https://www.cricapi.com/player/219889`
    },
    {
      name: 'Ravindra Jadeja',
      Runs: 0,
      pid: 234675,
      Wickets: 0,
      Catches: 0,
      shortName: 'Jadeja',
      image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwkILg1kuFbycP5dlDc1wZIic1Rd2PiAIq3QxLKMD1yBNjwyTi&usqp=CAU',
      battingAvg: 0,
      bowlingAvg: 0,
      matches: 0,
      link: `https://www.cricapi.com/player/234675`
    },
    {
      name: "Jasprit Bumrah",
      Runs: 0,
      pid: 625383,
      Wickets: 0,
      Catches: 0,
      shortName: 'Bumrah',
      image:
          'https://www.cricapi.com/playerpic/625383.jpg',
      battingAvg: 0,
      bowlingAvg: 0,
      matches: 0,
      link: `https://www.cricapi.com/player/625383`
    },
  ];
  voteCount = {
    Dhoni: 0,
    Kohli: 0,
    Warner: 0,
    Jadeja: 0,
    Bumrah: 0,
  };
  check: boolean = false;

  // chartLabels: string[] = Object.keys(this.voteCount);
  // chartData: number[] = Object.values(this.voteCount);
  chartLabels: string[];
  chartData: number[];
  chartType = 'pie';
  clickEnter: boolean = false;

  getVotes() {
    this.http.get('http://localhost:4000/getVotes')
        .subscribe(res => {
          console.log('Response for test vote', res);
          this.votesData = res;
          // this.displayCharts();
        });
    //https://cricapi.com/api/playerStats?pid=253802&apikey=wccgJav4W5SReVtv9ZXJIShzlPR2
    // this.http.get('https://cricapi.com/api/playerStats?pid=253802&apikey=wccgJav4W5SReVtv9ZXJIShzlPR2')
    //     .subscribe(res => {
    //       console.log('player details', res);
    //     })

  }

  displayCharts() {
    this.getVotes();
    // this.voteCount = {
    //   Dhoni: 0,
    //   Kohli: 0,
    //   Warner: 0,
    //   Jadeja: 0,
    //   Bumrah: 0,
    // };
    this.votesData.forEach(vote => {
      this.voteCount[vote.playerVoted] += 1;
    })
    console.log('this.vote@@@@@@@@@@@@',this.vote);
    // this.voteCount[this.vote] +=1;
    this.chartLabels = Object.keys(this.voteCount);
    this.chartData = Object.values(this.voteCount);

    console.log('chart data voute count@@@@@@', this.voteCount);

    this.displayChart = true;

  }

  searchMail(emailid) {
    this.clickEnter = true;
    if(this.ValidateEmail(emailid)){

      this.check = false;
      this.http.get('https://api.emailverifyapi.com/v3/lookups/json?key=7FEFF99F9A75E168&email='+emailid)
          .subscribe((res: any) =>{
            console.log(' REsult of email validation', res);
            // if(res){
            if(!res.deliverable) {
              this.check = true;
              this.clickEnter = false;
              alert("Invalid Email ID");
            } else {
              this.check = false;
              this.clickEnter = true;
              // if(!check) {
              //   this.http.post('http://localhost:4000/testVote',body).subscribe(res => console.log('Response for test vote', res));
              //   this.http
              //       .post('http://localhost:4000/vote', { player })
              //       .subscribe((res: any) => {
              //         this.vote = res.player;
              //         this.voted = true;
              //       });
              //   this.getVotes();
              // }
            }
            // }
          })

    }
  }

  castVote(player,emailid) {
    console.log('check value@@@@@', this.check);
    this.getVotes();
    this.votesData.forEach(item => {
      console.log('Each item in votes...',item);
      if (item.userName == emailid) {
        this.check = true;
        this.clickEnter = false;
        this.duplicate = true;
      }
      // this.duplicate = false;
    });
    if(!this.check && this.clickEnter){
      let body = {player,emailid}
      this.http.post('http://localhost:4000/testVote',body).subscribe(res => console.log('Response for test vote', res));
      this.http
          .post('http://localhost:4000/vote', { player })
          .subscribe((res: any) => {
            console.log('voted player#####', res);
            this.vote = res.player;
            this.voted = true;
            this.voteCount = {
              Dhoni: 0,
              Kohli: 0,
              Warner: 0,
              Jadeja: 0,
              Bumrah: 0,
            };
            this.voteCount[this.vote] += 1;
            console.log('vote count........',this.voteCount);
            this.displayCharts();
          });
      // this.getVotes();

    } else if(this.duplicate) {
      alert('Already casted your vote...!');
    } else {
      alert('Please Enter valid email to cast you vote!');
    }
    //console.log('entererd value', emailid);
  }

  ValidateEmail(mail)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  getVoteClasses(player) {
    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
    };
  }

  getPlayersData() {
    // this.playerapiData = [];
    // this.playerIds.forEach( player => {
    //   let url = `https://cricapi.com/api/playerStats?pid=${player}&apikey=wccgJav4W5SReVtv9ZXJIShzlPR2`
    //   this.http.get(url).subscribe(
    //       playerData => {
    //         this.playerapiData.push(playerData);
    //         console.log('Players data........', this.playerapiData);
    //       })
    // })
    this.playerData.forEach(player =>{
      let url = `https://cricapi.com/api/playerStats?pid=${player.pid}&apikey=wccgJav4W5SReVtv9ZXJIShzlPR2`
      this.http.get(url).subscribe(
          (playerData: any) => {
            console.log('api resnponse for players data...',playerData);
            player.Runs = playerData.data.batting.T20Is.Runs;
            player.battingAvg = playerData.data.batting.T20Is.Ave;
            player.bowlingAvg = playerData.data.bowling.T20Is.Ave;
            player.matches = playerData.data.batting.T20Is.Mat;
            console.log('Players data........', player.Runs);
          })
    })
  }

  ngOnInit() {
    console.log('entered');
    this.getPlayersData();
    this.getVotes();
    const channel = this.pusher.init();
    channel.bind('vote', ({ player }) => {
      console.log('Vote count variable...', this.voteCount);
      // this.voteCount[player] += 1;
      this.chartData = Object.values(this.voteCount);
    });
  }
}
