package com.mitocode.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Examen;
import com.mitocode.service.IExamenService;


@RestController
@RequestMapping("/examenes")
public class ExamenController {
	
	@Autowired
	private IExamenService service;
	
	@GetMapping
	public ResponseEntity<List<Examen>> listar(){
		 List<Examen> lista = service.listar();
		return new ResponseEntity<List<Examen>>(lista, HttpStatus.OK);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Examen> listarPorId(@PathVariable("id") Integer id){
		Examen obj = service.leerPorId(id);
		if(obj.getIdExamen() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<Examen>(obj, HttpStatus.OK); 
	}
	
	/*@GetMapping("/{id}")
	public Resource<Examen> listarPorId(@PathVariable("id") Integer id){
		Examen obj = service.leerPorId(id);
		if(obj.getIdExamen() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		//localhost:8080/examens/{id}
		Resource<Examen> recurso = new Resource<Examen>(obj);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		recurso.add(linkTo.withRel("examen-resource"));
		return recurso;
	
	}*/		
		
	
	/*@PostMapping
	public ResponseEntity<Examen> registrar(@Valid @RequestBody Examen examen) {
		Examen obj = service.registrar(examen);
		return new ResponseEntity<Examen>(obj, HttpStatus.CREATED);
	}*/
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Examen examen) {
		Examen obj = service.registrar(examen);
		//examens/4
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(examen.getIdExamen()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@PutMapping
	public ResponseEntity<Examen> modificar(@Valid @RequestBody Examen examen) {
		Examen obj = service.modificar(examen);
		return new ResponseEntity<Examen>(obj, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
		Examen obj = service.leerPorId(id);
		if(obj.getIdExamen() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
