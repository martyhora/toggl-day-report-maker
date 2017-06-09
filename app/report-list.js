import axios from 'axios'

const date = new Date();

const API_URL = 'api/v1/report';

const vm = {
    data: {
        tasks: [],
        date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
        token: '',
        workspaceId: '',
        isLoading: false
    },
    created: function() {
    },
    methods: {
        hideCopyIcon: function(task) {
            task.isCopyIconVisible = false
        },
        formatTime: function(dateString) {
            const seconds = parseInt(dateString, 10);
            let hours   = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds - (hours * 3600)) / 60);

            if (hours < 10) {
                hours   = `0${hours}`;
            }
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            return `${hours}:${minutes}`;
        },
        loadFromAPI: function() {
            this.isLoading = true;
            
            const date = this.date.split('.');

            axios.get(`${API_URL}/${date[2]}-${date[1]}-${date[0]}/${this.workspaceId}/${this.token}/`)
                .then(response => {
                    this.isLoading = false;

                    const tasks = response.data.data.map(task => {
                        const timeHours = task.dur / 3600000;

                        return {
                            project: task.project,
                            time: timeHours,
                            tags: task.tags.join(","),
                            text: task.description,
                            formattedTime: timeHours * 3600
                        }
                    });

                    let projs = [];

                    let resProjects = [];

                    tasks.forEach(task => {
                        const resultProjects = tasks.filter(taskF => taskF.project === task.project);

                        if (projs.indexOf(task.project) === -1 && task.project) {
                            resProjects.push({project: task.project, tasks: resultProjects})
                        }

                        projs.push(task.project)
                    });

                    this.tasks = resProjects.map(project => {
                        let tasks = [];

                        let tags = [];

                        let totalTimeProject = 0;

                        project.tasks.forEach(task => {
                            let rmTasks = [];

                            if (tags.indexOf(task.tags) === -1)
                            {
                                rmTasks = project.tasks.filter(taskF => taskF.tags === task.tags);

                                let totalTime = 0;
                                let texts = [];

                                rmTasks.forEach(rmTask => {
                                    totalTime += rmTask.time;

                                    if (texts.indexOf(rmTask.text) === -1) {
                                        texts.push(rmTask.text)
                                    }
                                });

                                tasks.push({
                                    project: task.project,
                                    text: texts.join("<br>"),
                                    textToCopy: texts.join("\n"),
                                    time: totalTime,
                                    formattedTime: this.formatTime(totalTime * 3600),
                                    tags: task.tags,
                                    isCopyIconVisible: true,
                                });

                                totalTimeProject += totalTime
                            }

                            tags.push(task.tags)
                        });

                        return { project: project.project, tasks: tasks, formattedTime: this.formatTime(totalTimeProject * 3600) }
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    computed: {
        totalTime: function() {
            let total = 0;

            this.tasks.forEach(task => {
                task.tasks.forEach(taskT => {
                    total += parseFloat(taskT.time)
                })
            });

            return this.formatTime(total * 3600)
        }
    }
};

export default vm