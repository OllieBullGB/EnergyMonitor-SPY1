/**
 *  Filename: get.js
 *  
 *  Author: Ollie Bull
 * 
 *  Date: 8th November 2021
 * 
 *  Description: A collection of routes used to process all valid GET requests
 *               and render the webpage aswell as sending a HTTP 200 response
 *               
 *  Version: 08/11/21 v1.0
 */

const mail = require('../processes/mail');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator');


router.get('/team', (req, res, next) => {
    res.status(200);
    res.render('team', {
        title: 'The Team',
        css: 'team',
    });
});

router.get('/signup', (req, res, next) => {
    res.status(200);
    res.render('signup', {
        title: 'Sign Up',
        css: 'signup',
        data: '',
    });
});

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());
//Validate incoming post data to ensure that it can and should be put into the mailing list
router.post('/signup', [
    check("firstName", "The first name field must not be empty")
    .exists()
    .isLength({
        min: 2,
        max: 128
    }),

    check("lastName", "The last name field must not be empty")
    .exists()
    .isLength({
        min: 2,
        max: 128
    }),

    check("email", "the email must be valid")
    .exists()
    .isEmail()
    .normalizeEmail(),

    check("comment", "comments not needed"),
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('signup', {
            title: 'Sign Up',
            css: 'signup',
            //We return the failure points as an attribute of a page rather than a post response in order to try
            //and prevent the use of botting on the mailing list as any non-webpage post requests will not know
            //the reasons for submission failure
            data: JSON.stringify(errors.errors),
        });
    } else {


        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var comment = req.body.comment;

        mail.addToMailingList(email, firstName, lastName, comment);
        res.render('signup', {
            title: 'Sign Up',
            css: 'signup',
            data: true,
        });
        res.status(204);
    }
});

router.get('/chapter1', (req, res, next) => {
    res.status(200);
    res.render('chapter1', {
        title: 'The UKs Changing Climate',
        css: 'chapter1',
    });
});

router.get('/chapter2', (req, res, next) => {
    res.status(200);
    res.render('chapter2', {
        title: 'Assessing UK Climate Risk',
        css: 'chapter2',
    });
});

router.get('/chapter3', (req, res, next) => {
    res.status(200);
    res.render('chapter3', {
        title: 'The Adaptation Return',
        css: 'chapter3',
    });
});

router.get('/chapter4', (req, res, next) => {
    res.status(200);
    res.render('chapter4', {
        title: 'Priorities for Action',
        css: 'chapter4',
    });
});

module.exports = router;