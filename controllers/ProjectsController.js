const ProjectModel = require("./../models/ProjectModel");

const addProject = async (req, res) => {
    try {
        console.log(req.body);
        
        const projectData = req.body;

        const photos = projectData.subTitles.map(
            (subTitle, index) => (
                {
                    imageSubTitle: subTitle,
                    imageUrl: projectData.images[index]
                }
            )
        );

        const mappedProject = {
            title: projectData.projectName,
            subTitle: projectData.projectFiled,
            liveDemo: projectData.projectLink,
            cssClass: projectData.cssClasses.split(','),
            photoUrl: projectData.mainImage,
            moreInfo: {
                description: projectData.description,
                skills: projectData.skills.split(','),
                photos: photos
            }
        };

        

        const project = await ProjectModel.create(mappedProject);
        res.status(200).json({
            "message" : "Project Added successfully",
            "project" : project
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find({});        
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addProject,
    getProjects
}