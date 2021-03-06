package com.myinvestor.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;


@Entity
@Cache
@NoArgsConstructor
@EqualsAndHashCode(of="id")
public class Stock {
	

	@Getter
	@Setter
	@Id 
	private String id;
	
	@Getter
	@Setter
	@Index
	private String exchangeName;
	
	@Getter
	@Setter
	@Index
	private String stockSymbol;
	
	@Getter
	@Setter
	private Double currentPE;
	
	@Getter
	@Setter
	private Double currentPrice;
	
	@Getter
	@Setter
	private Date extractedTimestamp ;

}
