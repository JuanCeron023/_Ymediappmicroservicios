package com.mitocode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mitocode.model.Paciente;
import com.mitocode.repo.IPacienteRepo;
import com.mitocode.service.IPacienteService;

@Service
public class PacienteServiceImpl implements IPacienteService{

	@Autowired	
	private IPacienteRepo repo;
	
	@Override
	public Paciente registrar(Paciente pac) {
		return repo.save(pac);
	}

	@Override
	public Paciente modificar(Paciente pac) {		
		return repo.save(pac);
	}

	@Override
	public List<Paciente> listar() {
		return repo.findAll();
	}
	
	@Override
	public Page<Paciente> listarPageable(Pageable pageable) {
		return repo.findAll(pageable);
	}

	@Override
	public Paciente leerPorId(Integer id) {
		Optional<Paciente> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Paciente();
	}

	@Override
	public boolean eliminar(Integer id) {		
		repo.deleteById(id);
		return true;
	}



}
