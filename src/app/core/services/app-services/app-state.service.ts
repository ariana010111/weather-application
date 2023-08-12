import {BehaviorSubject} from 'rxjs';
import {PrimeNGConfig} from 'primeng/api';
import {Injectable, RendererFactory2} from '@angular/core';
import {AppMenuStateService} from '@core/services/app-services/app-menu-state.service';

@Injectable()
export class AppStateService {
  ripple = true;
  menuClick: boolean;
  configClick: boolean;
  activeTopbarItem: any;
  configActive: boolean;
  layoutMode = 'static';
  profileMode = 'inline';
  inputStyle = 'outlined';
  topbarItemClick: boolean;
  menuHoverActive: boolean;
  topbarMenuActive: boolean;
  overlayMenuActive = false;
  staticMenuMobileActive = false;
  staticMenuDesktopInactive = false;
  layoutMenuScroller: HTMLDivElement;
  layoutClass = new BehaviorSubject({
    'menu-layout-static': !this.isOverlay(),
    'menu-layout-overlay': this.isOverlay(),
    'layout-menu-overlay-active': this.overlayMenuActive,
    'menu-layout-slim': this.isSlim(),
    'menu-layout-horizontal': this.isHorizontal(),
    'layout-menu-static-inactive': this.staticMenuDesktopInactive,
    'layout-menu-static-active': this.staticMenuMobileActive,
    'p-input-filled': this.inputStyle === 'filled',
    'p-ripple-disabled': !this.ripple
  });
  rotateMenuButton$ = new BehaviorSubject(false);
  darkMenuState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    public renderer: RendererFactory2,
    private menuService: AppMenuStateService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.primengConfig.ripple = true;
    this._updateView();
  }


  onLayoutClick(): void {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.menuService.reset();
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }

    if (this.configActive && !this.configClick) {
      this.configActive = false;
    }

    this.configClick = false;
    this.topbarItemClick = false;
    this.menuClick = false;
  }

  onMenuButtonClick(event): void {
    this.menuClick = true;
    this.rotateMenuButton$.next(!this.rotateMenuButton$.value);
    this.topbarMenuActive = false;

    if (this.layoutMode === 'overlay') {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }
    }

    event.preventDefault();
  }

  onMenuClick($event): void {
    this.menuClick = true;
  }

  onTopbarMenuButtonClick(event): void {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event, item): void {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarSubItemClick(event): void {
    event.preventDefault();
  }

  onConfigClick(event): void {
    this.configClick = true;
  }

  onRippleChange(event): void {
    this.ripple = event.checked;
  }

  hideOverlayMenu(): void {
    this.rotateMenuButton$.next(false);
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  isTablet(): boolean {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  isMobile(): boolean {
    return window.innerWidth <= 640;
  }

  isStatic(): boolean {
    return this.layoutMode === 'static';
  }

  isOverlay(): boolean {
    return this.layoutMode === 'overlay';
  }

  isHorizontal(): boolean {
    return this.layoutMode === 'horizontal';
  }

  isSlim(): boolean {
    return this.layoutMode === 'slim';
  }

  _updateView(): void {
    this.layoutClass.next({
      'menu-layout-static': !this.isOverlay(),
      'menu-layout-overlay': this.isOverlay(),
      'layout-menu-overlay-active': this.overlayMenuActive,
      'menu-layout-slim': this.isSlim(),
      'menu-layout-horizontal': this.isHorizontal(),
      'layout-menu-static-inactive': this.staticMenuDesktopInactive,
      'layout-menu-static-active': this.staticMenuMobileActive,
      'p-input-filled': this.inputStyle === 'filled',
      'p-ripple-disabled': !this.ripple
    });
  }
}
