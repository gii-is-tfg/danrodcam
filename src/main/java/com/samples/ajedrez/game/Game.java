package com.samples.ajedrez.game;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.samples.ajedrez.chess.ChessBoard;
import com.samples.ajedrez.model.BaseEntity;
import com.samples.ajedrez.player.Player;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "games")
@Getter
@Setter
public class Game extends BaseEntity {



	public Game(){

	}

	public Game(int id,String name,Integer tiempo,Boolean espectadores){
		this.id = id;
		this.name = name;
		this.tiempo = tiempo;
		this.espectadores = espectadores;
	}

	@Column(name = "name",unique = true)
	@NotEmpty
	private String name;

	@Column(name = "tiempo")
	@NotNull
	private Integer tiempo;

    @Column(name = "espectadores")
    @NotNull
    private Boolean espectadores;


	@Column(name = "numeroJugadores")
	@NotNull
	private Integer numeroJugadores;

	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "game_player",
        joinColumns = @JoinColumn(name = "game_id"),
        inverseJoinColumns = @JoinColumn(name = "player_id")
    )
	@JsonIgnore
	private List<Player> player;



	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "chessboard_id", referencedColumnName = "id")
	private ChessBoard chessBoard;


	@Column(name = "finPartida")
	private Boolean finPartida;


}
