const Sauce = require('../models/Sauces');
const fs = require('fs');


exports.createSauce = (req,res,next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}))
};

exports.modifySauce = (req,res,next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if(sauce.userId != req.auth.userId) {
            res.status(403).json({message: 'Non authorisé !'});
        } else {
            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
            .catch(error => res.status(401).json({error}));
        }
    })
    .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req,res,next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
       if(sauce.userId != req.auth.userId) {
          res.status(401).son({message: 'Non authorisé !'});
       } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () =>  {
             Sauce.deleteOne({_id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          });
       }
    })
    .catch(error => res.status(500).json({ error}));
};

exports.getOneSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id})
    .then( sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error}));
};

exports.getAllSauces = (req,res,next) => {
    Sauce.find()
    .then( sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.likesDislikesSauce =  (req,res,next) => {
    if (req.body.like === 1) {
        Sauce.updateOne( { _id:req.params.id}, { $push: { usersLiked: req.body.userId}, $inc: {likes: +1} })
        .then(() => res.status(200).json({ message: 'Vous avez aimé !'}))
        .catch( error => res.status(400).json({ error }));
} else if (req.body.like === -1) {
    Sauce.updateOne( { _id:req.params.id}, { $push: { usersDisliked: req.body.userId}, $inc: { dislikes: +1}})
    .then(() => res.status(200).json({message: 'Vous n\'avez pas aimé'}))
    .catch( error => res.status(400).json({error}));
} else {
    Sauce.findOne({ _id: req.params.id})
    .then( sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne( {_id: req.params.id}, { $pull: { usersLiked: req.body.userId}, $inc: { likes: -1}})
            .then(() => res.status(200).json({message: 'Like enlevé !'}))
            .catch( error => res.status(400).json({error}));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne( {_id: req.params.id}, {$pull: { usersDisliked: req.body.userId}, $inc: { dislikes: -1} })
            .then(() => res.status(200).json({message: 'Dislike enlevé !'}))
            .catch(error => res.status(400).json({ error}));
        }
    })
    .catch( error => res.status(400).json({ error }));
}
};
