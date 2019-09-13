class TaskBox extends React.Component{
    constructor() {
        super();
        this.state = {
            task: "",
            showError: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    onChange(e) {
        const task = e.target.value;
        this.setState({ task })
    }

    onAddTask() {
        var showError;
        if (this.validateForm()) {
            this.props.addTask(this.state.task);
            const task = "";
            this.setState({ task });
            showError = false;
        } else {
            showError = true;
        }
        this.setState({ showError });
    }

    validateForm() {
        return this.state.task.length !== 0;
    }

    render() {
        const errorMessage = <div className={"invalid-feedback"}>Formulaire invalide.</div>;
        return (
            <div>
                <h1>Ajouter une tâche</h1>
                <div className={"form-group justify-content-center row"}>
                    <div className={"col-sm-8"}>
                        <input type="text" className={ this.state.task.length === 0 ? 'form-control is-invalid' : 'form-control' } id={"task"} placeholder={"Add task..."} onChange={this.onChange} value={this.state.task} />
                        { this.state.showError ? errorMessage : "" }
                    </div>
                </div>
                <button type={"button"} className={"btn btn-primary"} onClick={this.onAddTask}>Add task</button>
            </div>
        );
    }
}

class Task extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            completed: props.task.completed,
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange() {
        const completed = !this.state.completed;
        this.setState({ completed })
    }

    onClick() {
        this.props.checked(this.props.task, !this.props.task.completed)
    }

    render() {
        return (
            <li>
                <label htmlFor={this.props.task.id} className={ this.props.task.completed ? "app-line font-weight-bold alert alert-success" : "font-italic alert alert-danger" }>
                    <input id={this.props.task.id} className={"mr-2"} type="checkbox" value={this.state.completed} onChange={this.onChange} checked={this.state.completed} onClick={this.onClick}/>
                    { this.props.task.description }
                    { this.props.task.completed ? " | Completed" : "" }
                </label>
            </li>
        );
    }
}

class Tasks extends React.Component{
    constructor() {
        super();
        this.state = {
            tasks: [
                {id: 1, description: "Achat de jeux vidéo", completed: false},
                {id: 2, description: "Achat de bouffe", completed: false},
                {id: 3, description: "Achat de la Sumsung Galaxy S10+", completed: true},
                {id: 4, description: "Présentation de la comparaison de vue et de réact", completed: true},
            ],
        };
        this.checked = this.checked.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    checked(task, checked) {
        const tasks = this.state.tasks;
        tasks[task.id - 1].completed = checked;
        this.setState({ tasks })
    }

    addTask(task) {
        task = {id: this.state.tasks.length + 1, description: task, completed: false };
        var tasks = this.state.tasks;
        tasks.push(task);
        this.setState({ tasks });
    }

    render() {
        const complete = this.state.tasks.filter((task) => task.completed === true);
        const incomplete = this.state.tasks.filter((task) => task.completed === false);
        const completeTask = (task) => (<Task task={task} key={task.id} checked={this.checked}/>);
        const incompleteTask = (task) => (<Task task={task} key={task.id} checked={this.checked}/>);
        return (
            <div className={"app-content container jumbotron"}>
                <h1>Tâche incomplète(s)</h1>
                <ul>
                    { incomplete.map(incompleteTask) }
                </ul>

                <h1>Tâche complète(s)</h1>
                <ul>
                    { complete.map(completeTask) }
                </ul>
                <TaskBox addTask={this.addTask}/>
            </div>
        );
    }
}

ReactDOM.render(<Tasks/>, document.getElementById("root"));