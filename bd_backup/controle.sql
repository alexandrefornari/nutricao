-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 
-- Versão do Servidor: 5.5.24-log
-- Versão do PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `controle`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE IF NOT EXISTS `aluno` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) CHARACTER SET latin1 NOT NULL,
  `nascimento` date NOT NULL,
  `sexo` varchar(10) CHARACTER SET latin1 NOT NULL,
  `id_escola` int(5) NOT NULL,
  `id_turma` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`id`, `nome`, `nascimento`, `sexo`, `id_escola`, `id_turma`) VALUES
(1, 'Alexandre', '2012-11-20', 'masculino', 3, 1),
(2, 'Ricardo', '2013-03-15', 'masculino', 3, 1),
(3, 'Bia', '2012-10-30', 'feminino', 3, 1),
(4, 'Livia', '2012-05-24', 'feminino', 4, 2),
(5, 'João', '2011-08-16', 'masculino', 4, 2),
(6, 'Neide', '2013-06-14', 'feminino', 5, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_medida`
--

CREATE TABLE IF NOT EXISTS `aluno_medida` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `id_aluno` int(10) unsigned NOT NULL,
  `id_medida` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `escola`
--

CREATE TABLE IF NOT EXISTS `escola` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) CHARACTER SET latin1 NOT NULL,
  `endereço` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Extraindo dados da tabela `escola`
--

INSERT INTO `escola` (`id`, `nome`, `endereço`) VALUES
(3, 'COC Sistema de Ensino', NULL),
(4, 'SEB COC', NULL),
(5, 'USP', NULL),
(6, 'UNESP', NULL),
(7, 'UNICAMP', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `escola_aluno`
--

CREATE TABLE IF NOT EXISTS `escola_aluno` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_escola` int(5) NOT NULL,
  `id_aluno` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `escola_aluno`
--

INSERT INTO `escola_aluno` (`id`, `id_escola`, `id_aluno`) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 3, 3),
(4, 4, 4),
(5, 4, 5),
(6, 5, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `escola_turma`
--

CREATE TABLE IF NOT EXISTS `escola_turma` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `id_escola` int(5) unsigned NOT NULL,
  `id_turma` int(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `escola_turma`
--

INSERT INTO `escola_turma` (`id`, `id_escola`, `id_turma`) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 3, 3),
(4, 3, 4),
(5, 4, 1),
(6, 4, 2),
(7, 4, 3),
(8, 4, 4),
(9, 5, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `medida`
--

CREATE TABLE IF NOT EXISTS `medida` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `peso` decimal(5,2) unsigned NOT NULL,
  `altura` decimal(3,2) unsigned NOT NULL,
  `imc` decimal(4,2) unsigned NOT NULL,
  `pcs` decimal(4,2) unsigned NOT NULL,
  `pct` decimal(4,2) unsigned NOT NULL,
  `soma` decimal(4,2) unsigned NOT NULL,
  `id_aluno` int(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Extraindo dados da tabela `medida`
--

INSERT INTO `medida` (`id`, `data`, `peso`, `altura`, `imc`, `pcs`, `pct`, `soma`, `id_aluno`) VALUES
(1, '2012-11-07', '80.50', '1.78', '22.00', '10.00', '10.00', '20.00', 1),
(2, '2013-03-06', '78.20', '1.77', '21.50', '10.00', '15.00', '25.00', 1),
(3, '2012-09-19', '77.56', '1.79', '20.00', '8.00', '8.00', '16.00', 1),
(4, '2012-05-23', '80.00', '1.87', '22.88', '10.00', '10.00', '20.00', 1),
(19, '2011-12-06', '6.00', '6.00', '0.17', '6.00', '6.00', '12.00', 1),
(20, '2013-04-02', '2.00', '2.00', '0.50', '2.00', '2.00', '4.00', 1),
(21, '2013-01-08', '3.00', '3.00', '0.33', '3.00', '3.00', '6.00', 1),
(22, '2013-10-02', '5.00', '5.00', '0.20', '5.00', '5.00', '10.00', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE IF NOT EXISTS `turma` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `turma`
--

INSERT INTO `turma` (`id`, `nome`) VALUES
(1, '1 serie'),
(2, '2 serie'),
(3, '3 serie'),
(4, '4 serie');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_aluno`
--

CREATE TABLE IF NOT EXISTS `turma_aluno` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `id_turma` int(5) unsigned NOT NULL,
  `id_aluno` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `turma_aluno`
--

INSERT INTO `turma_aluno` (`id`, `id_turma`, `id_aluno`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 3, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_aluno_escola`
--

CREATE TABLE IF NOT EXISTS `turma_aluno_escola` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `id_turma` int(5) NOT NULL,
  `id_aluno` int(10) NOT NULL,
  `id_escola` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `turma_aluno_escola`
--

INSERT INTO `turma_aluno_escola` (`id`, `id_turma`, `id_aluno`, `id_escola`) VALUES
(1, 1, 1, 3),
(2, 1, 2, 3),
(3, 1, 3, 3),
(4, 2, 4, 4),
(5, 2, 5, 4),
(6, 3, 6, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `login`, `senha`) VALUES
(1, 'teste', 'teste', 'teste'),
(2, 'teste2', 'teste2', 'teste2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_escola`
--

CREATE TABLE IF NOT EXISTS `usuario_escola` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(5) unsigned NOT NULL,
  `id_escola` int(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `usuario_escola`
--

INSERT INTO `usuario_escola` (`id`, `id_user`, `id_escola`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 1, 5),
(4, 2, 6),
(5, 2, 7);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
