import { makeAutoObservable } from "mobx";

export default class ResourcesPool<ResourceKind> {
    protected _pool: Map<ResourceKind,number>;

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

    public get size() : number {
        return this._pool.size;
    }

    public get resourceKinds(): ResourceKind[] {
        return Array.from(this._pool.keys());
    }

    public getResources(resource: ResourceKind) : number | null {
        const res = this._pool.get(resource);
        if (typeof res === "number") 
            return res;
        else return null;
    }

    public addResources(resource: ResourceKind, amount: number = 1): number {
        if (amount < 0) {
            throw new Error("Amount must be 0 or greater");
        }
        const newAmount = (this.getResources(resource) || 0) + amount;
        this._pool.set(resource, newAmount);
        return newAmount;
    }

    public removeResources(resource: ResourceKind, amount: number = 1): number | null {
        if (amount < 0) {
            throw new Error("Amount must be 0 or greater");
        }
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
        if (current !== null) {
            this.removeResources(resource,current);
            return current;
        }
        return 0;
    }

    public addResourceKind(resource: ResourceKind) : number {
        const previous = this.getResources(resource);
        if (previous === null) {
            this._pool.set(resource,0);
            return 0;
        } else {
            return previous;
        }
    }

    public removeResourceKind(resource: ResourceKind) : number {
        const previous = this.getResources(resource);
        if (previous !== null) {
            this._pool.delete(resource);
            return previous;
        }
        return 0;
    }
        

}