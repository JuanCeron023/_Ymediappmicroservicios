package com.mitocode.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Archivo;

public interface IArchivoRepo extends JpaRepository<Archivo, Integer>{

}
