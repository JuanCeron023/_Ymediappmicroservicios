package com.mitocode.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.mitocode.model.Paciente;
import com.mitocode.service.IPacienteService;


@RestController
@RequestMapping("/pacientes")
//@CrossOrigin()
public class PacienteController {
	
	@Autowired
	private IPacienteService service;
	
	@GetMapping
	public ResponseEntity<List<Paciente>> listar(){
		 List<Paciente> lista = service.listar();
		return new ResponseEntity<List<Paciente>>(lista, HttpStatus.OK);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Paciente> listarPorId(@PathVariable("id") Integer id){
		Paciente pac = service.leerPorId(id);
		if(pac.getIdPaciente() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<Paciente>(pac, HttpStatus.OK); 
	}
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<Paciente>> listarPageable(Pageable pageable) {
		Page<Paciente> pacientes = service.listarPageable(pageable);
		return new ResponseEntity<Page<Paciente>>(pacientes, HttpStatus.OK);
	}
	
	/*@GetMapping("/{id}")
	public Resource<Paciente> listarPorId(@PathVariable("id") Integer id){
		Paciente pac = service.leerPorId(id);
		if(pac.getIdPaciente() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		//localhost:8080/pacientes/{id}
		Resource<Paciente> recurso = new Resource<Paciente>(pac);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		recurso.add(linkTo.withRel("paciente-resource"));
		return recurso;
	
	}*/		
		
	
	/*@PostMapping
	public ResponseEntity<Paciente> registrar(@Valid @RequestBody Paciente paciente) {
		Paciente pac = service.registrar(paciente);
		return new ResponseEntity<Paciente>(pac, HttpStatus.CREATED);
	}*/
	
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Paciente paciente) {
		Paciente pac = service.registrar(paciente);
		//pacientes/4
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(paciente.getIdPaciente()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@PutMapping
	public ResponseEntity<Paciente> modificar(@Valid @RequestBody Paciente paciente) {
		Paciente pac = service.modificar(paciente);
		return new ResponseEntity<Paciente>(pac, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id){
		Paciente pac = service.leerPorId(id);
		if(pac.getIdPaciente() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

}
