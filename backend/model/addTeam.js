import mongoose from 'mongoose';
import TeamList from './teamModel.js'; // Model của đội
import TournamentList from './tournamentModel.js'; // Model của giải đấu

// Dữ liệu mẫu cho 8 đội
const teamsData = [
  {
    name: "Team Alpha",
    logo: "https://example.com/logos/team-alpha.png",
    captain: "Alice Johnson",
    players: [
      { name: "Alice Johnson", role: "Captain" },
      { name: "Bob Smith", role: "Support" },
      { name: "Charlie Lee", role: "Mid" },
      { name: "Daisy Brown", role: "ADC" },
      { name: "Eve White", role: "Jungle" }
    ]
  },
  {
    name: "Team Bravo",
    logo: "https://example.com/logos/team-bravo.png",
    captain: "Brian Carter",
    players: [
      { name: "Brian Carter", role: "Captain" },
      { name: "Sam Wilson", role: "Support" },
      { name: "David Green", role: "Mid" },
      { name: "Ethan Black", role: "ADC" },
      { name: "Grace Lee", role: "Jungle" }
    ]
  },
  {
    name: "Team Charlie",
    logo: "https://example.com/logos/team-charlie.png",
    captain: "Catherine Blake",
    players: [
      { name: "Catherine Blake", role: "Captain" },
      { name: "Harry Parker", role: "Support" },
      { name: "Isabel Brown", role: "Mid" },
      { name: "Jack Thomas", role: "ADC" },
      { name: "Kelly Adams", role: "Jungle" }
    ]
  },
  {
    name: "Team Delta",
    logo: "https://example.com/logos/team-delta.png",
    captain: "Daniel Harris",
    players: [
      { name: "Daniel Harris", role: "Captain" },
      { name: "Linda Wright", role: "Support" },
      { name: "Michael Davis", role: "Mid" },
      { name: "Nancy Scott", role: "ADC" },
      { name: "Oliver Moore", role: "Jungle" }
    ]
  },
  {
    name: "Team Echo",
    logo: "https://example.com/logos/team-echo.png",
    captain: "Edward King",
    players: [
      { name: "Edward King", role: "Captain" },
      { name: "Paula Young", role: "Support" },
      { name: "Quincy Hall", role: "Mid" },
      { name: "Rachel Allen", role: "ADC" },
      { name: "Steven Turner", role: "Jungle" }
    ]
  },
  {
    name: "Team Foxtrot",
    logo: "https://example.com/logos/team-foxtrot.png",
    captain: "Frank Nelson",
    players: [
      { name: "Frank Nelson", role: "Captain" },
      { name: "Tracy Baker", role: "Support" },
      { name: "Uma Walker", role: "Mid" },
      { name: "Victor Phillips", role: "ADC" },
      { name: "Wendy Mitchell", role: "Jungle" }
    ]
  },
  {
    name: "Team Golf",
    logo: "https://example.com/logos/team-golf.png",
    captain: "George Edwards",
    players: [
      { name: "George Edwards", role: "Captain" },
      { name: "Xavier Hughes", role: "Support" },
      { name: "Yvonne Clark", role: "Mid" },
      { name: "Zachary Torres", role: "ADC" },
      { name: "Amy Perry", role: "Jungle" }
    ]
  },
  {
    name: "Team Hotel",
    logo: "https://example.com/logos/team-hotel.png",
    captain: "Henry Fisher",
    players: [
      { name: "Henry Fisher", role: "Captain" },
      { name: "Ivy Brooks", role: "Support" },
      { name: "Jackie Clark", role: "Mid" },
      { name: "Karl Evans", role: "ADC" },
      { name: "Liam Martinez", role: "Jungle" }
    ]
  }
];

async function registerTeams() {
    try {
      // Kết nối MongoDB
      await mongoose.connect('mongodb+srv://giaphuocwork:bear123456@cluster0.ydwpz.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      // Thêm các đội vào TeamList
      const insertedTeams = await TeamList.insertMany(teamsData);
  
      console.log('Dữ liệu đội đã được thêm vào TeamList:', insertedTeams);
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  // Gọi hàm đăng ký đội
  registerTeams();