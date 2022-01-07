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
import com.mitocode.model.Especialidad;
import com.mitocode.service.IEspecialidadService;


@RestController
@RequestMapping("/especialidades")
public class EspecialidadController {
	
	@Autowired
	private IEspecialidadService service;
	
	@GetMapping
	public ResponseEntity<List<Especialidad>> listar(){
		 List<Especialidad> lista = service.listar();
		return new ResponseEntity<List<Especialidad>>(lista, HttpStatus.OK);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Especialidad> listarPorId(@PathVariable("id") Integer id){
		Especialidad obj = service.leerPorId(id);
		if(obj.getIdEspecialidad() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<Especialidad>(obj, HttpStatus.OK); 
	}
	
	/*@GetMapping("/{id}")
	public Resource<Especialidad> listarPorId(@PathVariable("id") Integer id){
		Especialidad obj = service.leerPorId(id);
		if(obj.getIdEspecialidad() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		//localhost:8080/especialidads/{id}
		Resource<Especialidad> recurso = new Resource<Especialidad>(obj);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		recurso.add(linkTo.withRel("especialidad-resource"));
		return recurso;
	
	}*/		
		
	
	/*@PostMapping
	public ResponseEntity<Especialidad> registrar(@Valid @RequestBody Especialidad especialidad) {
		Especialidad obj = service.registrar(especialidad);
		return new ResponseEntity<Especialidad>(obj, HttpStatus.CREATED);
	}*/
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Especialidad especialidad) {
		Especialidad obj = service.registrar(especialidad);
		//especialidads/4
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(especialidad.getIdEspecialidad()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@PutMapping
	public ResponseEntity<Especialidad> modificar(@Valid @RequestBody Especialidad especialidad) {
		Especialidad obj = service.modificar(especialidad);
		return new ResponseEntity<Especialidad>(obj, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
		Especialidad obj = service.leerPorId(id);
		if(obj.getIdEspecialidad() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
