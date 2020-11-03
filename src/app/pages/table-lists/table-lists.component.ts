import { Router } from '@angular/router';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { ModalManager } from 'ngb-modal';
import * as AOS from 'aos';

@Component({
    selector: 'app-table-lists',
    templateUrl: './table-lists.component.html',
    styleUrls: ['./table-lists.component.scss'],
})
export class TableListsComponent implements OnInit {
    p = 1;
    headers = ['name', ''];

    rows = [];

    assetList: Array<object>;

    @ViewChild('myModal') myModal;
    @ViewChild('myModal2') myModal2;
    @ViewChild('myModal3') myModal3;

    private modalRef;

    isDataAvailable = true;

    constructor(
        // tslint:disable-next-line: no-shadowed-variable
        private JavaDataService: JavaDataService,
        // tslint:disable-next-line: no-shadowed-variable
        private UserDetailsStorageService: UserDetailsStorageService,

        private modalService: ModalManager,

        private router: Router
    ) {}

    ngOnInit() {
        this.rows = this.UserDetailsStorageService.getDetailsWatchlists();
        this.isDataAvailable = true;
        setTimeout(function () {
            AOS.init();
        }, 100);
    }

    eliminarLista(id: number) {
        this.rows.forEach((element) => {
            if (element.id === id) {
                const index: number = this.rows.indexOf(element);
                this.rows.splice(index, 1);
                this.UserDetailsStorageService.setWatchlistsStorage(this.rows);
                this.eliminarListaSpring(element.id);
            }
        });
    }
    eliminarListaSpring(watchlistId: number) {
        this.cerrarModal();
        const watchlistIdNumber = Number(watchlistId);
        this.JavaDataService.deleteUserWatchlist(watchlistIdNumber).subscribe(
            (response) => {},
            (error) => {}
        );
    }

    crearLista(watchlistName: string) {
        let watchlistStorage: Array<object> = this.UserDetailsStorageService.getWatchlistsFromDetails();
        this.isDataAvailable = false;
        this.cerrarModal();
        this.JavaDataService.postUserWatchlist(watchlistName).subscribe(
            (response) => {
                watchlistStorage.push(response);
                this.rows = watchlistStorage;
                this.isDataAvailable = true;
                this.UserDetailsStorageService.setWatchlistsStorage(watchlistStorage);
            },
            (error) => {}
        );

        // setTimeout(function () {
        //     location.reload();
        // }, 5000);
    }

    cambiarNombreLista(watchlistId: number, watchlistNewName: string) {
        this.isDataAvailable = false;
        this.cerrarModal();
        const watchlistIdNumber = Number(watchlistId);
        this.JavaDataService.putWatchlistName(watchlistIdNumber, watchlistNewName).subscribe(
            (response) => {
                this.UserDetailsStorageService.updateDetailsUser();
            },
            (error) => {}
        );
        setTimeout(function () {
            location.reload();
        }, 4500);
    }

    abrirModal() {
        this.modalRef = this.modalService.open(this.myModal, {
            size: 'md',
            modalClass: '',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: 'modal-backdrop',
        });
    }

    cerrarModal() {
        this.modalService.close(this.modalRef);
    }

    abrirModal2() {
        this.modalRef = this.modalService.open(this.myModal2, {
            size: 'md',
            modalClass: '',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: 'modal-backdrop',
        });
    }

    abrirModal3() {
        this.modalRef = this.modalService.open(this.myModal3, {
            size: 'sm',
            modalClass: 'mymodal',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: 'modal-backdrop',
        });
    }

    getAssetListObject(id: number) {
        this.rows.forEach((element) => {
            if (element.id === id) {
                this.assetList = element.assets;
                const assetListState = element.assets;
                const navigationExtras = { state: { assetListState } };
                this.router.navigate(['detalles-listas-cedears'], navigationExtras);
            }
        });
    }
}
