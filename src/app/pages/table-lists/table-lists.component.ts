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

    @ViewChild('myModal') myModal;
    private modalRef;

    @ViewChild('myModal2') myModal2;
    private modalRef2;

    constructor(
        // tslint:disable-next-line: no-shadowed-variable
        private JavaDataService: JavaDataService,
        // tslint:disable-next-line: no-shadowed-variable
        private UserDetailsStorageService: UserDetailsStorageService,

        private modalService: ModalManager
    ) {}

    ngOnInit() {
        this.rows = this.UserDetailsStorageService.getDetailsWatchlists();
        console.log(this.rows);
        setTimeout(function () {
            AOS.init();
        }, 100);
    }

    eliminarLista(watchlistId: number) {
        const watchlistIdNumber = Number(watchlistId);
        console.log(watchlistId);
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
        this.JavaDataService.postUserWatchlist(watchlistName).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    cambiarNombreLista(watchlistId: number, watchlistNewName: string) {
        const watchlistIdNumber = Number(watchlistId);
        this.JavaDataService.putWatchlistName(watchlistIdNumber, watchlistNewName).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
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
        this.modalRef2 = this.modalService.open(this.myModal2, {
            size: 'md',
            modalClass: 'modalName',
            hideCloseButton: true,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: 'modal-backdrop',
        });
    }

    cerrarModal2() {
        this.modalService.close(this.modalRef2);
    }
}
