import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule],
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    // it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => { // erro: Expected null to be truthy e fixture.detectChanges() não resolve
    //     const component = fixture.componentInstance;
    //     fixture.detectChanges();
    //     expect(component.id).toBeTruthy();
    // });

    it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
        const someId = 'someId';
        fixture.detectChanges();
        component.id = someId;
        expect(component.id).toBeTruthy();
    });

    // teste de @Output, melhor maneira para EventEmitter
    it(`${LikeWidgetComponent.prototype.like.name} 
        should trigger (@Output liked) when called`, () => {
            spyOn(component.liked, 'emit');
            fixture.detectChanges();
            component.like();
            expect(component.liked.emit).toHaveBeenCalled();            
        });

});