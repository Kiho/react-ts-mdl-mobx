import express from 'express';
const router = express.Router();

import notes from './dummyNotes.json';
import projects from './dummyProjects.json';

function getNextId(list){
    var arr = list.map(x => x.id);
    var max = Math.max(...arr);
    return max + 1;
}

router.route('/project/')
    .get((req, res) => {
        res.send(projects.filter(x => x.id > 0));
    })
    .post((req, res) => {
        const data = req.body; // JSON.parse(req.body);
        data.id = getNextId(projects);
        console.log(data);
        projects.push(data);
        res.status(200).send();
    })
    .put((req, res) => { 
        const data = req.body; // JSON.parse(req.body);
        console.log(data);
        const idx = projects.findIndex((project) => project.id === data.id);
        projects[idx] = data;
        res.status(200).send();
    })
    .delete((req, res) => {
        const data = JSON.parse(req.body);
        const idx = projects.findIndex((project) => project.id === data.id);
        projects.splice(idx, 1);
        res.status(200).send();
    });

router.route('/project/:projectId')
    .get((req, res) => {      
        const id = parseInt(req.params.projectId);
        const idx = projects.findIndex((project) => project.id === id);
        console.log('projectId', id, idx);
        res.send(projects[idx]);
    });

export default router;