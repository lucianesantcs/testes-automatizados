import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {

    let service: UniqueIdService = null;
    beforeEach(() => { //beforeEach é executado antes de cada it
        service = new UniqueIdService();
    })

    // it('generateUniqueIdWithPrefix', () => {
    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should generate id when called with prefix`, () => {
        //const service = new UniqueIdService();
        const id = service.generateUniqueIdWithPrefix('app');
        // expect(id).toContain('app-');
        expect(id.startsWith('app-')).toBeTrue();
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should not generate duplicated id when called multiple times`, () => {
        //const service = new UniqueIdService();

        // verifica se dois ids são iguais:
            // const firstId = service.generateUniqueIdWithPrefix('app');
            // const secondId = service.generateUniqueIdWithPrefix('app');
            // expect(firstId).not.toBe(secondId);

        // verifica de forma mais legível se os ids são iguais:
        const ids = new Set(); // Set() ignora elementos duplicados
        for (let i = 0; i < 50; i++) {
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        expect(ids.size).toBe(50);

    });

    it(`${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} 
        should return of generated ids when called`, () => {
        //const service = new UniqueIdService();
        service.generateUniqueIdWithPrefix('app');
        service.generateUniqueIdWithPrefix('app');
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should throw when called with empty`, () => {
        
        // verifica se o id é nulo:
            // expect(service.generateUniqueIdWithPrefix(null)).toThrow(); //jasmine não entende que a exceção deve ser executado com sucesso
            // expect(() => service.generateUniqueIdWithPrefix(null)).toThrow(); // correto: usa função () => {} para jasmine entender que se !== de null deve dar erro
        
        // verifica de forma mais legível se o id é nulo, undefined, vazio:
        const emptyValues = [null, undefined, '', '0', '1'];
        emptyValues.forEach((value) => {
            expect(() => service.generateUniqueIdWithPrefix(value))
            .withContext(`Empty value: ${value}`) // avisa qual parâmetro que fez o teste quebrar
            .toThrow();
        });
    });
});