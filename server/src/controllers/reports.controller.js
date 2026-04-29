import * as reportsService from '../services/reports.service.js';

export async function getReceipt(req, res) {
  try {
    const data = await reportsService.getReceiptDetails(req.params.receiptNo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getSales(req, res) {
  try {
    const { from, to } = req.query;
    const data = await reportsService.getSalesHistory(from, to);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPerformance(req, res) {
  try {
    const { start, end, theater, movie, show } = req.query;
    const data = await reportsService.getPerformanceAnalysis(start, end, theater, movie, show);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTheaters(req, res) {
  try {
    const data = await reportsService.getAllTheaters();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMovies(req, res) {
  try {
    const data = await reportsService.getAllMovies();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}