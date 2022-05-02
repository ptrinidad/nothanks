export default abstract class ActionSpace {
    public constructor() {}

    public abstract performAction() : void;
}

export abstract class WorkerPlacementActionSpace extends ActionSpace {
    _occupied: boolean;
    _worker: Worker | null;

    public constructor ();
    public constructor (occupied?: boolean, worker?: Worker) {
        super();
        this._occupied = occupied ?? false;
        this._worker = worker ?? null;
    }

    public asssignWorker (worker: Worker) : boolean {
        if (this._worker == null) {
            this._worker == worker;
            this.performAction();
            return true;
        } else {
            return false;
        }
    }
}