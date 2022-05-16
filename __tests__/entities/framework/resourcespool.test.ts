import '@testing-library/jest-dom'
import ResourcesPool from 'src/entities/framework/resourcesPool';

jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });

describe('Empty resources pool', () => {
    test('resource pool with no kinds of resource', () => {
        const holder = new ResourcesPool<string>();

        expect(holder.size).toBe(0);
        expect(holder.getResources("")).toBeNull();
    })

    test('resource pool with one kind of resource, and no resources of that kind', () => {
        const holder = new ResourcesPool<string>();

        holder.addResources("kind1", 0);

        expect(holder.size).toBe(1);
        expect(holder.getResources("")).toBeNull();
        expect(holder.getResources("kind1")).toBe(0);
    })

    test('resource pool with one kind of resource, and no resources of that kind after adding 1, removing 1', () => {
        const holder = new ResourcesPool<string>();

        holder.addResources("kind1", 1);
        holder.removeResources("kind1", 1)

        expect(holder.size).toBe(1);
        expect(holder.getResources("kind1")).toBe(0);
        expect(holder.resourceKinds).toEqual(["kind1"]);
    })
})

describe('Resources pool addition test', () => {
    test('resource pool with one kind of resource, double addition', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 1);
        holder.addResources("kind1"); // default amount is 1

        expect(holder.size).toBe(1);
        expect(holder.getResources("kind1")).toBe(2);
        expect(holder.resourceKinds).toEqual(["kind1"]);
    });

    test('resource pool with two kinds of resource, double addition', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 2);
        holder.addResources("kind1", 3);
        holder.addResources("kind2", 10);

        expect(() => holder.addResources("kind1", -3)).toThrow("Amount must be 0 or greater");
        expect(holder.size).toBe(2);
        expect(holder.getResources("kind1")).toBe(5);
        expect(holder.getResources("kind2")).toBe(10);
        expect(holder.resourceKinds).toEqual(["kind1", "kind2"]);
    });
});

describe('Resources pool removal test', () => {
    test('resource pool with one kind of resource, simple removal', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 10);
        holder.addResources("kind1"); // default amount is 1
        holder.removeResources("kind1"); // default amount is 1

        expect(holder.size).toBe(1);
        expect(holder.getResources("kind1")).toBe(10);
        expect(holder.resourceKinds).toEqual(["kind1"]);

        expect(() => holder.removeResources("kind1", -3)).toThrow("Amount must be 0 or greater");
    });

    test('resource pool with one kind of resource, double removal', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 10);
        holder.removeResources("kind1"); // default amount is 1
        holder.removeResources("kind1", 2); // default amount is 1

        expect(holder.size).toBe(1);
        expect(holder.getResources("kind1")).toBe(7);
        expect(holder.resourceKinds).toEqual(["kind1"]);
    });

    test('resource pool with one kind of resource, remove all', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 10);
        holder.addResources("kind1"); // default amount is 1
        holder.removeAllFromResource("kind1");

        expect(holder.size).toBe(1);
        expect(holder.getResources("kind1")).toBe(0);
        expect(holder.resourceKinds).toEqual(["kind1"]);
    });

    test('resource pool with two kinds of resource, partial removal', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 2);
        holder.addResources("kind1", 3);
        holder.addResources("kind2", 10);
        holder.removeResources("kind1", 2);
        holder.removeResources("kind2", 5);

        expect(() => holder.removeResources("kind1", -3)).toThrow("Amount must be 0 or greater");;
        expect(holder.size).toBe(2);
        expect(holder.getResources("kind1")).toBe(3);
        expect(holder.getResources("kind2")).toBe(5);
        expect(holder.resourceKinds).toEqual(["kind1", "kind2"]);
    });
});

describe('Resources pool kinds removal test', () => {
    test('resource pool with one kind of resource, simple removal of a kind', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 10);
        holder.addResources("kind1"); // default amount is 1
        const resources = holder.removeResourceKind("kind1");

        expect(holder.size).toBe(0);
        expect(holder.resourceKinds).toEqual([]);
        expect(resources).toEqual(11);
    });

    test('resource pool with two kindss of resource, remove one of them', () => {
        const holder = new ResourcesPool<string>();
        holder.addResources("kind1", 10);
        holder.addResources("kind1"); // default amount is 1
        holder.addResources("kind2", 10);
        holder.addResources("kind2"); // default amount is 1
        const resources = holder.removeResourceKind("kind1");

        expect(holder.size).toBe(1);
        expect(holder.resourceKinds).toEqual(["kind2"]);
        expect(resources).toEqual(11);
        expect(holder.getResources("kind1")).toBeNull();
        expect(holder.getResources("kind2")).toBe(11);
    });
});