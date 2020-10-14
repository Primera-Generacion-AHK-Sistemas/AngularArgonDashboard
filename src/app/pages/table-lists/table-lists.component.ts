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
                this.UserDetailsStorageService.setDetailsUser();
                this.rows = this.UserDetailsStorageService.getDetailsWatchlists();
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
}
