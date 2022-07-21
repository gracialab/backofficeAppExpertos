import { Component } from '@angular/core';
import { NbThemeService, NbIconLibraries } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from './@core/data/solar';
import { MENU_ITEMS } from '../pages/pages-menu';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mrfixsos-backoffice';
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };
  menu = MENU_ITEMS;
  constructor(private themeService: NbThemeService,
    private solarService: SolarData,
    private iconLibraries: NbIconLibraries) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];

        this.iconLibraries.registerSvgPack('mrfix', {
          'menu':'<svg width="100%" height="100%" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.667V0H0V2.667H24Z" fill="#010101"/><path d="M24 9.33299H0V6.66699H24V9.33299Z" fill="#010101"/><path d="M12 16H0V13.333H12V16Z" fill="#010101"/></svg>'
          // ...
    });
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }
}
