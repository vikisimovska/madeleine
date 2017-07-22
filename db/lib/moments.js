const models = require('../models');

module.exports = {

  getAllMoments(userID) {
    return models.Moment.where({ user_id: userID }).fetch();
  },

  getMoment(momentID) {
    return models.Moment.where({ id: momentID }).fetch();
  },

  saveMoment(momentObject) {
    const cred = momentObject.media.text.s3Cred ||
      momentObject.media.audio.s3Cred ||
      momentObject.media.photo.s3Cred ||
      momentObject.media.text.s3Head.params['x-amz-credential'];
    const params = {
      display_type: momentObject.displayType,
      avg_sentiment: momentObject.sentiment,
      highlight: momentObject.highlight,
      audio_uri: momentObject.media.audio.uri || null,
      text_uri: momentObject.media.text.uri || null,
      photo_uri: momentObject.media.photo.uri || null,
      user_id: momentObject.userId,
      cred
    };
    return models.Moment.forge(params).save();
  },

  updateMoment(momentObject) {
    return models.Moment.where({
      id: momentObject.id
    }).fetch()
      .then((uniqueMoment) => {
        uniqueMoment.save({
          display_type: momentObject.displayType,
          avg_sentiment: momentObject.sentiment,
          highlight: momentObject.highlight,
          audio_uri: momentObject.media.audio.uri,
          text_uri: momentObject.media.text.uri,
          photo_uri: momentObject.media.photo.uri,
          user_id: momentObject.userId
        }, { method: 'update' });
      });
  }
};
