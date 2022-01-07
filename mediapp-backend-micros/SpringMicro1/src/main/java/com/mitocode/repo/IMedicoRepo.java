package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Medico;

//@Repository
public interface IMedicoRepo extends JpaRepository<Medico, Integer>{
	
}
