package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Especialidad;

//@Repository
public interface IEspecialidadRepo extends JpaRepository<Especialidad, Integer>{
	
}
