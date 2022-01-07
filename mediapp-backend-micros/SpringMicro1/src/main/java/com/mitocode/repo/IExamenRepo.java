package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Examen;

//@Repository
public interface IExamenRepo extends JpaRepository<Examen, Integer>{
	
}
