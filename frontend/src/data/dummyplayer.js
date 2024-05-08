import defaultplayer from '@/assets/icons/defaultplayer.svg';
const dummyPlayer = [
  { id: 1,     
    content: '정준수',
    data: {
    user_id: '정준수아이디',
    start_time : 1200,
    end_time : 1400,
    day_of_week : "Mon",
    info: "none",
    gender : "male",
    indoor : "indoor",
    difficulty : "easy",
    status: "open",
    pass: 90,
    shooting: 70,
    dribble: 80,
    speed: 90
  }, type: 'player'

 },
 { id: 2,     
    content: '오치승',
    data: {
    user_id: '오치승아이디',    
    start_time : 1200,
    end_time : 1400,
    day_of_week : "Mon",
    info: "none",
    gender : "male",
    indoor : "indoor",
    difficulty : "easy",
    status: "open",
    pass: 70,
    shooting: 70,
    dribble: 90,
    speed: 60
  }, type: 'player'

 },
 { id: 3,     
    content: '우찬명',
    data: {
    user_id: '우찬명아이디',
    start_time : 1200,
    end_time : 1400,
    day_of_week : "Tue",
    info: "none",
    gender : "male",
    indoor : "outdoor",
    difficulty : "expert",
    status: "open",
    pass: 80,
    shooting: 80,
    dribble: 80,
    speed: 80
  }, type: 'player'

 },
  ];
  
  export default dummyPlayer;