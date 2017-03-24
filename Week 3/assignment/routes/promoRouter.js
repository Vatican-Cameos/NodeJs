var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();
var Verify = require('./verify');

var Promotions = require('../models/promotions')
promoRouter.use(bodyParser.json());
promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser,function(req, res, next) {
        Promotions.find({}, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.create( req.body, function(err, promotion) {
            if (err) throw err;
            var id = promotion._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Promotion has been added with id " + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser,function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        }, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.findByIdAndRemove(req.params.promoId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    })


promoRouter.route('/:promoId/comments')
    .get(Verify.verifyOrdinaryUser,function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promotion) {
            if (err) throw err;
            res.json(promotion.comments);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promotion) {
            if (err) throw err;
            promotion.comments.push(req.body);
            promotion.save(function(err, promotion) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(promotion);
            });
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promotion) {
            if (err) throw err;
            for (var i = (promotion.comments.length - 1); i >= 0; i--) {
                promotion.comments.id(promotion.comments[i]._id).remove();
            }
            promotion.save(function(err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    });

promoRouter.route('/:promoId/comments/:commentId')
    .get(Verify.verifyOrdinaryUser,function(req, res, next) {
        Promotions.findById(req.params.promoId,  function(err, promotion) {
            if (err) throw err;
            res.json(promotion.comments.id(req.params.commentId));
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Promotions.findById(req.params.promoId, function(err, promotion) {
            if (err) throw err;
            promotion.comments.id(req.params.commentId).remove();
            promotion.comments.push(req.body);
            promotion.save(function(err, promotion) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(promotion);
            });
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promotion) {
            promotion.comments.id(req.params.commentId).remove();
            promotion.save(function(err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports = promoRouter;
