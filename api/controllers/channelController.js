// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel);
};

const getChannelSchedule = async (req, res) => {

  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();

  channelSchedule.schedule = channelSchedule.schedule.map((elem) => {
  
    return {
      ...elem,
      starttimeutc: utils.convertToDateObject(elem.starttimeutc),
      endtimeutc: utils.convertToDateObject(elem.endtimeutc),
  
    };
  });

  res.json(channelSchedule.schedule);

};

const getChannelPrograms = async (req, res) => {
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`)
  programs = await programs.json()

  res.json(programs)

  
}

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getChannelPrograms
};
