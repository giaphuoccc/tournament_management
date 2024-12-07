import TeamList from '../models/teamModel.js';

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('tournament');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

export const addTeam = async (req, res) => {
  const { name, logo, captain, players } = req.body;
  try {
    const team = new TeamList({ name, logo, captain, players });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error adding team', error });
  }
};