import { makeAutoObservable, makeObservable, observable } from "mobx";

export default class ResourcesPool<ResourceKind> {
    _pool: Map<ResourceKind,number>;

    public constructor()
    public constructor(kinds?: ResourceKind[]) {
        this._pool = new Map<ResourceKind, number> ();
        if (kinds) {
            for (var kind of kinds) {
                this._pool.set(kind,0);
            }
        }
        makeAutoObservable(this);
    }

    public getResources(resource: ResourceKind) : number | null {
        const res = this._pool.get(resource);
        if (typeof res === "number") 
            return res;
        else return null;
    }

    public addResources(resource: ResourceKind, amount: number = 1): number {
        const newAmount = (this.getResources(resource) || 0) + amount;
        this._pool.set(resource, newAmount);
        return newAmount;
    }

    public removeResources(resource: ResourceKind, amount: number = 1): number | null {
        const current = this.getResources(resource);
        if (current && current >= amount) {
            const newAmount = current - amount;
            this._pool.set(resource, newAmount);
            return newAmount;
        } else {
            return null;
        }
    }

    public removeAllFromResource (resource: ResourceKind) : number {
        const current = this.getResources(resource);
        if (current) {
            this.removeResources(resource,current);
            return current;
        }
        return 0;
    }
}