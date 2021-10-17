import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    // usa-se async await e complieComponents para garantia caso builder usado para carregar o modulo mude
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            //providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }] // alternativa não recomendada para fixture.detectChanges();
            imports: [LikeWidgetModule],
            // imports: [FontAwesomeModule],
            // declarations: [LikeWidgetComponent],
            // providers: [UniqueIdService]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        //const component = fixture.componentInstance; // instância do componente LikeWidgetComponent
        expect(component).toBeTruthy();
    });

    // it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => { // erro: Expected null to be truthy e fixture.detectChanges() não resolve
    //     const component = fixture.componentInstance;
    //     fixture.detectChanges();
    //     expect(component.id).toBeTruthy();
    // });

    it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
        //const component = fixture.componentInstance;
        const someId = 'someId';
        fixture.detectChanges(); // chama métodos de ciclo de vida do angular
        component.id = someId;
        expect(component.id).toBeTruthy();
    });

    // teste de @Output com done(), mas melhor usar método spyOn
        // it(`${LikeWidgetComponent.prototype.like.name} 
        //  should trigger (@Output liked) when called`, done => {
        //         fixture.detectChanges();
        //         component.liked.subscribe(() => { // subscribe pois o EventEmitter é um observable
        //             expect(true).toBeTrue(); // apenas verifica se foi chamado
        //             done(); // chama para função assíncrona e permite que o teste mostre que o teste falhou 
        //         });
        //         component.like();
        //     });

    // teste de @Output, melhor maneira para EventEmitter
    it(`${LikeWidgetComponent.prototype.like.name} 
        should trigger (@Output liked) when called`, () => {
            spyOn(component.liked, 'emit');
            fixture.detectChanges();
            component.like();
            expect(component.liked.emit).toHaveBeenCalled();            
        });

});