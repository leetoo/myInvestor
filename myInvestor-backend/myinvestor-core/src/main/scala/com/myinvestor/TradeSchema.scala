package com.myinvestor

import java.util.UUID

import com.datastax.spark.connector.mapper.DefaultColumnMapper
import org.joda.time.DateTime

/**
  * Database schema
  */
object TradeSchema {

  // Keyspace
  val Keyspace = "myinvestor"

  // Tables
  val RequestTable = "request"
  val ExchangeTable = "exchange"
  val StockTable = "stock"
  val StockHistoryTable = "stock_history"
  val StockInfoTable = "stock_info"
  val StockInfo2Table = "stock_info2"
  val DividendSummaryTable = "dividend_summary"
  val DividendHistoryTable = "dividend_history"
  val G2YFinanceMappingTable = "g2yfinance_mapping"
  val ChosenStockTable = "chosen_stock"

  // Columns
  val ExchangeNameColumn = "exchange_name"
  val StockSymbolColumn = "stock_symbol"
  val HistoryDateColumn = "history_date"
  val YahooExchangeNameColumn = "y_exchange_name"
  val YahooStockSymbolColumn = "y_stock_symbol"
  val GoogleExchangeNameColumn = "g_exchange_name"
  val GoogleStockSymbolColumn = "g_stock_symbol"
  val CategoryColumn = "category"


  // Classes

  @SerialVersionUID(1L)
  trait ModelBase extends Serializable

  case class Request(requestId: UUID, success: Boolean, errorMsg: String, received: DateTime = DateTime.now())

  case class Exchange(exchangeName: String, description: String, stockCount: Int, yahooFinanceExchangeName: String, countryCode: String) extends ModelBase

  case class Stock(stockSymbol: String, stockName: String, exchangeName: String) extends ModelBase

  case class StockHistory(stockSymbol: String, exchangeName: String, historyDate: DateTime,
                          historyOpen: Double, historyHigh: Double, historyLow: Double, historyClose: Double,
                          historyVolume: Double) extends ModelBase

  case class StockInfo(stockSymbol: String, exchangeName: String,
                       infoCurrentPrice: BigDecimal, infoPe: BigDecimal, infoExtractedTimestamp: DateTime = DateTime.now()) extends ModelBase

  case class StockInfo2(stockSymbol: String, exchangeName: String,
                        info52weeksFrom: String, info52weeksTo: String,
                        infoBeta: String, infoChange: String, infoChangePercentage: String,
                        infoCurrentPrice: String, infoDividendYield: String, infoEps: String,
                        infoInstOwn: String, infoMarketCapital: String, infoOpen: String,
                        infoPe: String, infoRangeFrom: String, infoRangeTo: String, infoShares: String,
                        infoTime: String, infoVolume: String,
                        infoExtractedTimestamp: DateTime = DateTime.now()) extends ModelBase

  case class DividendSummary(gExchangeName: String, gStockSymbol: String, dividendYear: Int, dividend: Double,
                             currentPrice: Double, priceDate: DateTime, dividendYield: Double) extends ModelBase

  case class DividendHistory(yExchangeName: String, yStockSymbol: String, dividendDate: DateTime, dividend: Double) extends ModelBase

  case class G2YFinanceMapping(gStockSymbol: String, yStockSymbol: String, gExchangeName: String, gStockName: String, yExchangeName: String, yStockName: String) extends ModelBase

  case class ChosenStock(category: String, exchangeName: String, stockSymbol: String, createDate: DateTime) extends ModelBase

  // Object mapper
  object StockInfo2 {

    implicit object Mapper extends DefaultColumnMapper[StockInfo2](
      Map(
        "info52weeksFrom" -> "info_52weeks_from",
        "info52weeksTo" -> "info_52weeks_to"
      )
    )

  }

  object JobType extends Enumeration {

    type JobType = Value

    val NotDefined, ScrapStockInfo, ScrapStockHistory, ScrapStockDividendHistory, DividendSummary, ScrapStock, ScrapStockMapping,
    StockDataGenerator, BollingerBand = Value

    def getJob(s: String): Option[Value] = values.find(_.toString.equalsIgnoreCase(s))

  }

  trait Job extends ModelBase with Serializable {
    def jobName: String

    def exchangeName: String

    def symbols: Array[String]
  }

  case class BatchJob(jobName: String, exchangeName: String, symbols: Array[String]) extends Job


  // Web scraping request
  trait WebScraping extends ModelBase

  case class WebScrapingResult(status: Boolean) extends WebScraping

  // For data generation request
  trait DataGenerator extends ModelBase

  case class DataGeneratorResult(status: Boolean) extends DataGenerator


  // ----- Processed trade analysis results
  trait Analysis extends ModelBase with Serializable {
    def status: Boolean
  }

  // -- This is for fundamental analysis results
  trait FA extends Analysis

  // -- This is the result to be returned...
  case class DividendAchieverAnalysis(status: Boolean) extends FA


  // -- This is for technical analysis results
  trait TA extends Analysis

  // -- This is the result to be returned...
  case class BollingerBandAnalysis(status: Boolean) extends TA

}
