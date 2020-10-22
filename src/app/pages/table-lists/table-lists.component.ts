import { Router } from '@angular/router';
import { element } from 'protractor';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { ModalManager } from 'ngb-modal';

@Component({
    selector: 'app-table-lists',
    templateUrl: './table-lists.component.html',
    styleUrls: ['./table-lists.component.scss'],
})
export class TableListsComponent implements OnInit {
    p = 1;
    headers = ['name', ''];

    rows = [];

    assetList: any;

    @ViewChild('myModal') myModal;
    @ViewChild('myModal2') myModal2;
    @ViewChild('myModal3') myModal3;

    private modalRef;

    isDataAvailable = false;

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
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    crearLista(watchlistName: string) {
        this.isDataAvailable = false;
        this.cerrarModal();
        this.JavaDataService.postUserWatchlist(watchlistName).subscribe(
            (response) => {
                this.UserDetailsStorageService.updateDetailsUser();
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
        setTimeout(function () {
            location.reload();
        }, 4500);
    }

    cambiarNombreLista(watchlistId: number, watchlistNewName: string) {
        this.isDataAvailable = false;
        this.cerrarModal();
        const watchlistIdNumber = Number(watchlistId);
        this.JavaDataService.putWatchlistName(watchlistIdNumber, watchlistNewName).subscribe(
            (response) => {
                this.UserDetailsStorageService.updateDetailsUser();
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
        setTimeout(function () {
            location.reload();
        }, 4500);
    }

    abrirModal() {
        this.modalRef = this.modalService.open(this.myModal, {
            size: 'md',
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

    cerrarModal() {
        this.modalService.close(this.modalRef);
    }

    abrirModal2() {
        this.modalRef = this.modalService.open(this.myModal2, {
            size: 'md',
            modalClass: 'mymodal',
            hideCloseButton: true,
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
                console.log(this.assetList);
                const assetListState = element.assets;
                console.log(assetListState);
                const navigationExtras = { state: { assetListState } };
                this.router.navigate(['detalles-listas-cedears'], navigationExtras);
            }
        });
    }
}
