import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private restService: RestService) {}

	private options = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};
	public login(email: string, password: string): Observable<any> {
		const url = 'http://localhost:8080/login';
		return this.restService.post<any>(
			url,
			{
				username: email,
				password: password,
			},
			{ Accept: 'application/json', 'Content-Type': 'application/json' }
		);
	}
}
